/**
 * Created by Administrator on 2016/7/4 0004.
 */

var app = require('app');
//console.log(app)
app.registerController('SpecialsCtrl', ['$scope', ($scope) => {
    $scope.title = "运费特惠";
}]);