/**
 * Created by Administrator on 2016/7/4 0004.
 */
//var app = require('app')
import app from "app";
app.registerController('EnterprisCtrl', ['$scope', ($scope) => {
  $scope.title = "Enterpris Page";
}]);
