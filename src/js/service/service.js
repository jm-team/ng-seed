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

        },

        createIframe: function (src) {
            var iframe = document.createElement('iframe');
            var _this = this;
            var oBody = document.body;
            var defer = $q.defer();
            var str = '';

            // 删除iframe
            function removeIframe() {
                angular.element(iframe).remove();
            }

            iframe.src = src;
            iframe.style.display = 'none';
            oBody.appendChild(iframe);

            iframe.onload = function () {
                try {
                    str = iframe.contentWindow.location.href;
                    str = str.substr(str.indexOf('?') + 1);
                } catch (e) {
                    defer.reject();
                    console.log(e);
                }

                if (str) {
                    defer.resolve(_this.search(str, 'shiroJID'));
                } else {
                    defer.reject();
                }

                // 删除iframe
                removeIframe();
            };

            return defer.promise;
        }

    };
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

app.factory('Login', function (Address, $http) {
    return {
        checkIsRequiredCode: function (data) {
            console.log(data);
            return $http.jsonp(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=checkLoginNeedVerifyCode&callback=JSON_CALLBACK', {
                params: data
            });
        },

        checkCode: function (data) {
            return $http.jsonp(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=validateVerifyCode&callback=JSON_CALLBACK', {
                params: data
            });
        }
    }
});

app.factory('Api', function ($resource, Address) {
    return {
        Lines: function () {
            return $resource(Address.API_ADDRESS + '/auction/:id', {
                id: '@id'
            });
        },

        GridDataList: function () {
            return $resource('/dist/mock/gridData.json');
        }
    }
});

app.factory('News', function ($resource, API_SERVER, API_KEY) {
    return $resource(API_SERVER + '/news/:id', {
        id: '@id',
        apiKey: API_KEY
    }, {
        update: {
            method: 'PUT'
        }
    });
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
