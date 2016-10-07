var app = require('../app')

app.factory('Util', ['$modal', '$sce', '$q', '$location',  function($modal, $sce, $q, $location) {
  var proviceTm = 0;

  return {

    trim: function() {
      if (!String.prototype.trim) {
        return function(value) {
          return angular.isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
        };
      }
      return function(value) {
        return angular.isString(value) ? value.trim() : value;
      };
    },

  };
}]);

/**
 * Address - 环境地址配置
 *
 */
app.factory('Address', ['$location', 'SERVER_ADDRESS', '$q', 'USERCENTER_ADDRESS',  function($location, SERVER_ADDRESS, $q, USERCENTER_ADDRESS){
  return {

    localAddress: $location.absUrl(),


    localHost: $location.protocol() +'://'+ $location.host()+':'+$location.port(),

    //用户中心地址
    USERCENTER_ADDRESS: USERCENTER_ADDRESS,

    // API 请求基础地址
    API_ADDRESS: $location.protocol() +'://'+ $location.host()+':'+$location.port() +'/webapi/v1',

    // 获取当前地址
    getLocalAddress: function(){
      return $location.absUrl();
    },

    //获取登录地址
    getLoginAddress: function(){
      return SERVER_ADDRESS + '/webapi/v1/login?successful='+ this.getLocalAddress();
    },

    getLogoutAddress: function(){
      return SERVER_ADDRESS + '/webapi/v1/logout?successful='+ this.getLocalAddress();
    }


  };
}]);

app.factory('Login', ['Address', '$http', function(Address, $http){
  return {
    checkIsRequiredCode: function(data){
      console.log(data);
      return $http.jsonp(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=checkLoginNeedVerifyCode&callback=JSON_CALLBACK', {params:data});
    },

    checkCode: function(data){
      return $http.jsonp(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=validateVerifyCode&callback=JSON_CALLBACK', {params:data});
    }
  }
}])

app.factory('Address', ['$location',function($location){
  return {
    API_ADDRESS: $location.protocol() +'://'+ $location.host()+':'+$location.port() +'/webapi/v1',
  }
}])

app.factory('Api', ['$resource', 'Address', function($resource, Address){
  return {
    Lines: function(){
      return $resource(Address.API_ADDRESS + '/line/:id', {id: '@id'});
    }
  }
}])
