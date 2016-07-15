/**
 * Created by Administrator on 2016/7/4 0004.
 */
var app = require('app');

app.registerController('TrackCtrl', ['$scope', ($scope) => {
    $scope.title = "Track Page";
}]);