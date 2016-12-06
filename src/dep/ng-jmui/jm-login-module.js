/**
 * [聚运通登录模块]
 * @description
 *
 * 需要以下3方：
 *  需要认证中心
 *  接口服务提供商
 *  客户端
 *
 * 正常步骤:
 * 1.光标离开用户输入框 使用jsonp到认证中心判断是否需要验证码
 *     a). 返回出错也判断为需要验证码
 * 2.客户端根据返回的值显示验证码输入框
 *
 * 3.点击登录 判断表单填写是否正确
 *     a). 正确 走第4步
 *     b). 错误 显示表单填写错误
 *
 * // 需要验证码
 * 4.使用jsonp去认证中心判断验证码是否正确
 *     a). 正确提交表单
 *     b). 失败显示验证码错误
 *
 * // 不需要验证码
 * 4.表单提交登录到认证中心
 *
 * 5.认证中心处理完毕根据表单的from字段会跳到相应平台的登录接口
 * 6.接口根据表单中action地址中successful中的url参数返回到客户端
 *     a). 接口会创建shiroJID 并拼接到successful中的url上
 * 7.客户端监听iframe load事件 从iframe的location上获取shiroJID
 * 8.js 根据获取的shiroJID获取用户信息
 *     a). shiroJID没有或出错就认为是登录失败
 *
 *
 *
 * @example
    <example module="loginExample">
     <file name="page/login.html">
     <div ng-controller="ExampleController">
         <form id='login-form'
            name='loginnormal'
            class="jm-form form-horizontal"
            method='post'

            // iframe ID
            target='loginFrame'

            // 登录表单指令 用于DOM操作
            jm-login-login

            // 表单提交地址  因为action使用angularjs 绑定有问题 所以在指令中动态修改action
            serverUrl="https://uc.dev.com/cas/v1/login"

            // 获取的sessionId 字段名
            sessionId="shiroJID"

            // 弹出框关闭事件
            on-close="close()"
            novalidate>

            <!-- 服务端需要 {serverAddress：根据各个平台 各自匹配}-->
            <!-- example: serverAddress : "http://dev-webapi.jm.com/webapi/shiro-cas" -->
            <input id='service' class="ng-hide" name='service' value='{{serverAddress}}/webapi/shiro-cas' />

            <!-- 来源 {form: 登录发起点}-->
            <!-- example: form : "http://dev-webapi.jm.com/webapi/v1/login?successful=http://192.168.23.208:80/dist/img/icon-open.png?t=Mon Oct 24 2016 10:15:39 GMT+0800 (中国标准时间)" -->
            <input name="from" class="ng-hide" value="{{from}}"/>

            <!-- 平台代码 {bizcode: 服务端判断平台}-->
            <!-- example: bizcode : 1004 -->
            <input id='bizcode' class="ng-hide" name='bizcode' value='1004'/>


         用户名: <input type="text" name="username" ng-blur="checkIsRequiredCode()"ng-model="userName"><br />
         密  码: <input type="password" name="password" ng-model="password"><br />
         验证码: <input type="text" ng-model="checkcode" name="checkcode" ng-required="isRequiredCode">
         <input ng-model="rememberMe"  type="checkbox" name="rememberMe"> Remember me
         <button ng-click="submit(user)">SAVE</button>
         </form>
     </div>
 *
 */
;(function(window, angular, undefined){

    //  去除字符串头尾的空格
    //  例如： trim("  235   ")  =>  "235"
    var trim = (function(){
        if (!String.prototype.trim) {
            return function(value) {
                return angular.isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
            };
        }
        return function(value) {
            return angular.isString(value) ? value.trim() : value;
        };
    }());

    //  去除字符串头尾的空格
    //  例如： getUrlSearch("http://www.jyt.com?a=1&b=2", "a")  => {a:1}
    //  例如： getUrlSearch("http://www.jyt.com?a=1&b=2")  => {a:1, b:2}
    var getUrlSearch = function(str, key){
        if(angular.isString(str)){
            var searchs = str.substr(str.indexOf('?')+1).split('&');
            var oSearchs = {};

            angular.forEach(searchs, function(item){
                var _sv = item.split('=');
                oSearchs[_sv[0]] = _sv[1];
            });

            if(angular.isString(key)){
                return oSearchs[key];
            }
            return oSearchs;
        }else{
            return str;
        }
    };

    //  去除字符串头尾的空格
    //  例如： Cookie.setCookie("a", "b", '/', new Date())
    //  例如： Cookie.getCookie("a")   => "b"
    var Cookie = {
        setCookie: function(name, val, path, date) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + date);
            var sDate = angular.isUndefined(date) ? "" : ";expires=" + oDate +';path='+(path?path:'/');
            document.cookie = name + "=" + val + sDate;
        },

        getCookie: function(name) {
            var sCookies = document.cookie;
            var arr = sCookies.split('; ');
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == name) {
                    return arr2[1];
                }
            }
        }
    };

    //聚贸登录弹框模块
    angular.module('jm.login', ['ng'])

    // 登录服务
        .factory('JmLoginService', function($q, $http, $log){
            return {

                // 点击获取验证码
                // url  验证码获取地址
                getVerfiCode: function(url){
                    return url + "&t=" + (new Date().getTime());
                },

                //检测是否需要验证码
                // options = {
                //  data:       : 数据        [Object]
                //      username: 用户名       [String]  必填
                //  serverUrl   : 请求地址     [String]  必填
                // }

                //  例如： JmLoginService.checkIsRequiredVerfiCode({ username:'1111', serverUrl:'http://www/jyt.com'})
                checkIsRequiredVerfiCode: function(options){
                    var data = options.data;
                    var userName = trim(data.username);
                    var serverUrl = options.serverUrl;
                    var defer = $q.defer();
                    // 判断是否是字符串 并且是有值的
                    if(angular.isString(userName) && userName){
                        $http.jsonp(serverUrl, {params:data}).then(function(data){
                            defer.resolve(data.data);
                        }, function(e){
                            defer.reject(e);
                            $log.error('检测是否需要验证码 请求出错');
                        });
                    }else{
                        $log.error('没有用户名或用户名非字符串');
                        defer.reject({errMsg: "没有用户名或用户名非字符串"});
                    }
                    return defer.promise;
                },

                // 检测验证码是否正确
                // options = {
                //  data:       : 数据        [Object]
                //      checkcode: 验证码       [String]  必填
                //  serverUrl   : 请求地址     [String]  必填
                // }

                //  例如： JmLoginService.checkValidVerfiCode({ checkcode:'1111', serverUrl:'http://www/jyt.com'})
                checkValidVerfiCode: function(opitions){
                    var data = opitions.data || {};
                    var code = trim(data.checkcode);
                    var serverUrl = opitions.serverUrl;
                    var defer = $q.defer();

                    if(angular.isString(code) && code){
                        $http.jsonp(serverUrl, {params:data}).then(function (data) {
                            var data = data.data ||{};
                            var valid = data.verifyCode || false;
                            if(valid){
                                defer.resolve(valid);
                            }else{
                                defer.reject(valid);
                            }
                        }, function (e) {
                            $log.error('检测验证码是否正确 请求出错');
                            defer.reject(e);
                        });
                    }else{
                        defer.reject({errMsg:"没有证码或证码非字符串"})
                    }

                    return defer.promise;
                }
            }
        })

        // 指令 用于创建ifrmae 设置表单的action
        // target: 创建的iframe名称 和 表单提交的target  必填
        // serverurl: 表单提交地址    必填
        // sessionid: sessionid 名称 存在cookie中
        // 例如： <form login-form target="iframeName" serverurl="https://uc.dev.com/cas/v1/muteLogin" sessionid="shiroJID"></form>
        .directive('jmLoginLogin', function($log, $rootScope){
            return {
                restrict:'A',
                link: function(scope, element, attrs){
                    var iframe = angular.element(document.createElement('iframe'));
                    var sessionId =  attrs.sessionid || 'shiroJID';
                    var iframeName = attrs.target;

                    iframe.attr({
                        name:iframeName,
                        id:iframeName
                    });

                    iframe.css('display', 'none')
                    angular.element(document.body).append(iframe);
                    element.attr('action', attrs.serverurl);

                    // 作用域删除 删除掉iframe
                    scope.$on('$destroy', function(){
                        iframe.remove();
                    });

                    // 表单提交成功结果
                    iframe.on('load', function(){
                        try {
                            var oLocationMsg;
                            var session;
                            str = parent.document.getElementById(iframeName).contentWindow.location.href;
                            str = str.substr(str.indexOf('?')+1);
                            oLocationMsg = getUrlSearch(decodeURI(str)) ||{};
                            session = oLocationMsg[sessionId];

                            if(session){
                                Cookie.setCookie(sessionId, session);
                                $log.info(oLocationMsg);
                                $rootScope.$broadcast('getSessionIdSuccess', oLocationMsg)
                            }else{
                                $log.error("没有shiroJID");
                                $rootScope.$broadcast('getSessionIdError');
                            }
                        } catch(e){
                            $log.error("获取iframe地址出错");
                            $rootScope.$broadcast('getSessionIdError');
                        }
                    });

                    // 表单失败
                    iframe.on('error', function(){
                        $log.error("iframe加载失败");
                        $rootScope.$broadcast('getSessionIdError');
                    });
                }
            }
        })

})(window, window.angular);
