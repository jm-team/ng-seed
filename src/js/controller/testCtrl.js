var app = require('../app')
require('../service/service.js')
console.log(app)

app.controller('HomeCtrl', ['$scope', 'Api', function($scope, Api){
  angular.extend($scope, {
    data:[1,2,3,4,5]
  });

  Api.Lines().get({id:1})
}])
