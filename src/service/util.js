var app = require('app');
console.log(app)
app.factory('Util', function () {
    var trim = (function(){
        if (!String.prototype.trim) {
            return function trim(value) {
                return angular.isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
            };
        }
        return function trim(value) {
            return angular.isString(value) ? value.trim() : value;
        };
    })();
    return {
        /**
         * 字符串去空格
         * @author zhoul
         * @returns {string} 去除空格后的字符串
         */
        trim: trim,

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
        },

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
    }


});