var app = require('app');

// 调用Api 服务
app.registerController('HelpCtrl',
    /*@ngInject*/
    function ($scope, $http, $q) {
        angular.extend($scope, {
            title: 'help center',
            desc: '帮助中心'
        });
    }
);
