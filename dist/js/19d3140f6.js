webpackJsonp([1],{

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by Administrator on 2016/7/4 0004.
	 */

	var app = __webpack_require__(1);

	app.registerController('HomeCtrl', ['$scope', 'AuthService', '$http', 'Cookie', '$q', 'Public', 'SERVER_ADDRESS', 'SessionService', 'datePickService', function ($scope, AuthService, $http, Cookie, $q, Public, SERVER_ADDRESS, SessionService, datePickService) {
	    $scope.title = 'Home.page  XXXXXXXXXXX';

	    angular.extend($scope, {

	        lists: [{ name: 'zl', age: 12 }, { name: 'yl', age: 12 }, { name: 'xx', age: 15 }],

	        getDate: function getDate() {
	            datePickService.createDatePick($scope.date);
	        },

	        get: function get() {
	            SessionService.setUser({ name: 'zl', age: 12 });
	            // demo.get({canCancel: true});
	        },
	        post: function post() {
	            // $http.post('http://192.168.23.234:8080/webapi/user/getUserInfo?shiroJID='+Cookie.getCookie('shiroJID'), {
	            //     name: 123,
	            //     age:456
	            // })
	            // return ;
	            AuthService.save({
	                // token:Public.token,
	                // shiroJID:Cookie.getCookie('shiroJID')
	            }, {
	                canCancel: true,
	                name: 123,
	                age: 456
	            });
	        },

	        getBase: function getBase() {
	            Public.getBase(['company_type', 'business_scope']).then(function (data) {
	                console.log(data);
	            });
	        },

	        getBaseOther: function getBaseOther() {
	            Public.getBase(['company_type', 'business_scope', 'service_level']).then(function (data) {
	                console.log(data);
	            });
	        },

	        batch: function batch() {
	            Public.Batch().save({}, {
	                data: [{ "data": { name: 1 }, "method": "post", "uri": "/subTest1/1" }, { "data": { name: 25 }, "method": "get", "uri": "/subTest2/2" }]
	            });
	        }
	    });
	}]);

/***/ }

});