angular.module('jmui.search', [])
    .factory('jmSearch', function ($state, $timeout) {

        return saveSearchUrl;

        function saveSearchUrl(scope, callback) {
            // fix 延迟注册，防止切换回当前路由触发2次查询
            $timeout(function () {
                var originRouter = $state.current.name;

                scope.$on('$locationChangeStart', function (obj, newUrl, oldUrl) {
                    // fix 离开当前路由，防止不必要查询
                    if (originRouter !== $state.current.name) {
                        return false;
                    }
                    callback();
                });
            });
        }
    });