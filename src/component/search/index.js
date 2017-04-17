/*global angular*/
(function () {
  "use strict";

  angular.module('jmui.search', [])
    .factory('jmSearch', function ($state, $timeout) {

      return saveSearchUrl;

      function saveSearchUrl(scope, callback) {
        // fix 延迟注册，防止切换回当前路由触发2次查询
        if (angular.isFunction(callback)) {
          $timeout(function () {
            var originRouter = $state.current.name;

            scope.$on('$locationChangeStart', function (obj, newUrl, oldUrl) {
              // fix 离开当前路由，防止不必要查询
              var currentRouter = $state.current.name;
              if (originRouter === currentRouter) {
                callback();
              }
            });
          }, 0);
        }
      }
    });
}());
