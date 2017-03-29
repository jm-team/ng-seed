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
              var a =  dialogs.modal({
                    method: 'login',
                    modalClassName:'dialog-box',
                    // animteClassName: 'bounceInDown animated',
                    backdropClass:'login',
                    templateUrl: loginV2Tmp,
                    success:function(data){
                        var result = data.data.data;
                        alert('tick')
                    },
                    controller: 'loginV2Ctrl',
                })
            }
        }
    };
});
