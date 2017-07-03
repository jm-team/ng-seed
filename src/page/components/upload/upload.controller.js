/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');

app.registerController('UploadCtrl', UploadCtrl);

function UploadCtrl($scope, Api, $q){
  $scope.files = [];
  $scope.onComplete = function(arg){

  }
}
