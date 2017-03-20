var app = require('app');

app.factory('Util', function ($q) {
    return {
        /**
         * 字符串去空格
         * @author zhoul
         * @returns {string} 去除空格后的字符串
         */
        trim: function () {
            if (!String.prototype.trim) {
                return function (value) {
                    return angular.isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
                };
            }
            return function (value) {
                return angular.isString(value) ? value.trim() : value;
            };
        },

        /**
         * 根据类名获取dom
         * @author zhoul
         * @param   {string} className               类名
         * @param   {object} [context=document.body] 上下文对象
         * @returns {Array}     获取到的一组DOM对象
         */
        getByClassName: function (className, context) {
            var re = new RegExp("\\b" + className + "\\b", "g");
            var context = context || document.body;
            var aEle = context.getElementsByTagName('*');
            var aResult = [];
            if (!angular.isString(className) || angular.equals('', className)) {
                return;
            }
            for (var i = 0; i < aEle.length; i++) {
                /*字符串search方法判断是否存在匹配*/
                if (aEle[i].className.search(re) != -1) {
                    aResult.push(aEle[i]);
                }
            }
            return aResult;

        }
    }
});

//Address - 环境地址配置
app.factory('Address', function ($location, SERVER_ADDRESS, $q, USERCENTER_ADDRESS) {
    return {

        localAddress: $location.absUrl(),


        localHost: $location.protocol() + '://' + $location.host() + ':' + $location.port(),

        //用户中心地址
        USERCENTER_ADDRESS: USERCENTER_ADDRESS,

        // API 请求基础地址
        API_ADDRESS: $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/webapi/v1',

        // 获取当前地址
        getLocalAddress: function () {
            return $location.absUrl();
        },

        //获取登录地址
        getLoginAddress: function () {
            return SERVER_ADDRESS + '/webapi/v1/login?successful=' + this.getLocalAddress();
        },

        getLogoutAddress: function () {
            return SERVER_ADDRESS + '/webapi/v1/logout?successful=' + this.getLocalAddress();
        }


    };
});

app.factory('Api', function ($resource, $http, Address) {
    return {
        Lines: function () {
            return $resource(Address.API_ADDRESS + '/auction/:id', {
                id: '@id'
            });
        },

        GridDataList: function () {
            return $resource('/dist/mock/gridData.json');
        },

        doLogin: function (email, password) {
            return $http.post('/webapi/doLogin', { email: email, password: password });
        },
        checkVerifyCode: function () {
            return $resource(Address.API_ADDRESS + '/validateVerifyCode/:id', { id: '@id' });
        },
        /**
         * 获得用户信息
         */
        User: function () {
            // return $resource('/webapi/v1/getMsg');
        }
    }
});

app.factory('Cookie', function ($q) {
    return {
        /**
         * 设置Cookie
         * @author zhoul
         * @param {string} name 设置的Cookie属性
         * @param {string} val  设置的Cookie值
         * @param {string} path 设置的Cookie的路径
         * @param {number} date 设置的Cookie的过期时间(天数)
         */
        setCookie: function (name, val, path, date) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + (date || 30));
            var sDate = ";expires=" + oDate;
            var Path = ";path=" + (path || "/");


            document.cookie = name + "=" + val + sDate + Path;
        },

        /**
         * 获取Cookie
         * @author zhoul
         * @param   {string} name 需要获取的Cookie属性
         * @returns {string} 获取到的Cookie值
         */
        getCookie: function (name) {
            var sCookies = document.cookie;
            var arr = sCookies.split('; ');
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == name) {
                    return arr2[1];
                }
            }
        },

        /**
         * 删除Cookie
         * @author zhoul
         * @param {string} name 需要删除的Cookie
         */
        delCookie: function (name) {
            this.setCookie(name, '', '', -1);
        },

        /**
         * 获取Cookie的个数
         * @author zhoul
         * @returns {number} Cookie的个数
         */
        cookieLength: function () {
            var sCookie = document.cookie;
            var arr = sCookie.split('; ');
            if (!sCookie) {
                return 0;
            }
            return arr.length;
        }
    }
});

// ajax请求服务
app.factory('requestService', function () {
    return {
        // 请求队列
        requests: [],

        /**
         * 清除所有带canCancel参数的请求，
         * 用于取消路由已状态跳转，
         * 但是之前路由正在ajax还未返回结果请求。
         * 
         * @author zhoul
         * @param requests {Array} 需要取消请求的数组 [可选] 如果没有就清除所有在队列中的所有请求
         */
        clearAll: function (requests) {
            if (angular.isArray(requests)) {
                angular.forEach(requests, function (req) {
                    req.resolve();
                });
            } else {
                angular.forEach(this.requests, function (req) {
                    req.resolve();
                });
                this.requests = [];
            }
        }
    };
});

// 登录相关
app.factory('Auth', function ($resource, Address, $q, $timeout) {
    return {
        /**
         * 获取非对称加密的数据接口
         * @author zhoul
         * @returns resource
         */
        security: function () {
            return $resource(Address.API_ADDRESS + '/security');
        },

        /**
         * 用户登录接口
         * @author zhoul
         * @returns resource
         */
        auth: function () {
            return $resource(Address.API_ADDRESS + '/doLogin');
        },

        /**
         * 判断用户是否登录
         * @author zhoul
         * @param opt {Object}  可选的参数对象
         * @returns promise
         */
        isLogin: function (opt) {
            var options = angular.extend({}, opt);
            var defer = $q.defer();
            var $ = angular.element;

            // 用户已经登录回调
            window.userLoginSuccessCallback = function (token) {
                oScript.remove();
                console.log('suc')
                defer.resolve(token);
            }

            // 用户未登录回调
            window.userNotLoginCallback = function () {
                console.log('err')
                oScript.remove();
                defer.reject({ error: 'ERROR' });
            }

            var oScript = $(document.createElement('script'));
            oScript.attr({
                src: options.src,
                id: 'hasLogin'
            });

            angular.element(document.getElementById('hasLogin')).remove();
            $(document.body).append(oScript)
            return defer.promise;
        },

        /**
         * 使用表单提交登录处理逻辑
         * @author zhoul
         * @returns promise
         */
        submit: function (form, options) {
            var defer = $q.defer();
            var iframe = angular.element('<iframe></iframe>');
            var iframeName = options.iframeName || 'loginIframe';

            iframe.attr({
                name: iframeName,
                id: iframeName
            }).css('display', 'none');
            angular.element(document.body).append(iframe);
            angular.element(form).attr({
                action: options.action,
                target: iframeName
            });


            // 表单提交成功结果
            iframe.on('load', function () {
                try {
                    str = parent.document.getElementById(iframeName).contentWindow.document.body.innerHTML;
                    defer.resolve(angular.fromJson(str));
                } catch (e) {
                    defer.reject();
                }
            });

            // 使用延时 解决密码做加密后 model同步缓慢 提交的密码是非加密的密码
            $timeout(function () {
                form.submit();
            }, 0)
            return defer.promise;
        }
    }
});

// 用户相关
app.factory('User', function () {

    /**
     * 用户构造器函数
     */
    function User() {
        this.user = {};
    }

    // 设置用户信息
    User.prototype.setUser = function (user) {
        this.user = user;
    }

    // 获取用户 返回当前用户
    User.prototype.getUser = function () {
        return this.user;
    }

    return new User();
});
