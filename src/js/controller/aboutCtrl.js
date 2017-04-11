var app = require('app');

// 调用Api 服务
app.registerController('AboutCtrl',
    /*@ngInject*/
    function ($scope, Api, $interval) {
        angular.extend($scope, {
            title: 'About Page',
            desc: '关于。。。。'
        });

        // $interval(function () {
        //     $scope.text = Math.random();
        // }, 3000)
    });
