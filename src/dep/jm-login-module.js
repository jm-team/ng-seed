;
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
                if (arr2[0] = name) {
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

                    //angular.element(document.getElementById(iframeName))

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

                            str = parent.document.getElementById(iframeName).contentWindow.location.href;

                            str = str.substr(str.indexOf('?')+1);
                            str = trim(getUrlSearch(str,sessionId));

                            if(str){
                                Cookie.setCookie(sessionId, str);
                                $log.info(str);
                                $rootScope.$broadcast('getSessionIdSuccess', {sessionId: str})
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
