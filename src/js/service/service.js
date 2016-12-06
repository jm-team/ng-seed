var app = require('../app');

app.factory('Util', function () {
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

app.factory('Address', function ($location) {
    return {
        API_ADDRESS: $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/webapi/v1'
    }
});

app.factory('Api', function ($resource, Address) {
    return {
        Lines: function () {
            return $resource(Address.API_ADDRESS + '/auction/:id', {
                id: '@id'
            });
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
