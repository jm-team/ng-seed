//  拦截器
var app = require('app');
app.factory('httpInterceptor', function($q, $injector, Util) {
  var httpInterceptor;
  httpInterceptor = {
    responseError: function(response) {
      // 拦截响应错误处理这里.....
      return $q.reject(response);
    },

    response: function(response) {
      // 拦截响应成功处理这里.....
      return response;
    },

    request: function(config) {
      // 拦截请求处理这里.....
      console.log('拦截请求处理')

      if (angular.isObject(config.params) && config.params.canCancel) {
        var defer = $q.defer();
        config.timeout = defer.promise;
        Util.requests.push(defer);
      }


      return config;
    },

    requestError: function(config) {
      // 拦截请求失败处理这里.....
      return $q.reject(config);
    }
  };
  return httpInterceptor;
});
