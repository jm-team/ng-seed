/**
 * Created by Administrator on 2016/7/4 0004.
 */
import app from 'app';
console.log(app);
// var style = require('../../css/style.css');
app.registerController('OrderCtrl', ['$scope', ($scope) => {
  $scope.title = "Order Page";
}]);