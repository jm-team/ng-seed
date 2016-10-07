var app = require('../app')

// 调用Api 服务
app.registerController('HomeCtrl', ['$scope', 'Api', function($scope, Api){
    angular.extend($scope, {
        title:'About Page',
        desc:'关于。。。。'
    });



    Api.Lines().get({id:1})
}])
