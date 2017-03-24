var app = require('app');

// 调用Api 服务
app.registerController('HelpCtrl',
    /*@ngInject*/
    function ($scope, $http, $q) {
        var deferred = $q.defer();

        angular.extend($scope, {
            title: 'help center',
            desc: '帮助中心'
        });
        
        // $http.get('/dist/mock/news.json').success(function (result) {
        //     deferred.resolve(result);
        //     $scope.data = result;
        //     console.log($scope.data)
        // }).error(function (result) {
        //     deferred.reject(result);
        // });
        // return deferred.promise;
    }
);