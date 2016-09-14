var app = require('../app')
console.log(app)

app.controller('HomeCtrl', ['$scope', function($scope){
  angular.extend($scope, {
    data:[1,2,3,4]
  });
}])
