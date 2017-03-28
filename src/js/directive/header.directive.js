var app = require('app');
var tmpHeader = require('./header.html');
var loginTmp = require('component/login/login.html');
var loginV2Tmp = require('component/loginV2/login.html');
require('controller/loginCtrl.js');
require('controller/loginV2Ctrl.js');

app.directive('jmHeader', function (dialogs) {
    return {
        restrict: 'AE',
        templateUrl: tmpHeader,
        replace: true,
        controller: function ($scope, User) {
            $scope.user = User.user;

            // 弹出登录框
            $scope.modalV2 = function() {
                dialogs.modal({
                    method: 'login',
                    modalClassName:'dialog-box',
                    // animteClassName: 'bounceInDown animated',
                    backdropClass:'login',
                    templateUrl: loginV2Tmp,
                    controller: 'loginV2Ctrl',
                }).then(function(data) {
                    var result = data.data.data;
                    dialogs.close();
                });
            }
        }
    };
});
