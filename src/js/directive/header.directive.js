var app = require('app');
var tmpHeader = require('./header.html');
var loginTmp = require('component/login/login.html');
var loginV2Tmp = require('component/loginV2/login.html');
require('controller/loginCtrl.js');
require('controller/loginV2Ctrl.js');

app.directive('jmHeader', function () {
    return {
        restrict: 'AE',
        templateUrl: tmpHeader,
        replace: true,
        controller: function ($modal, $scope) {
            $scope.modalV2 = function ($event) {
                $event.preventDefault();
                $modal.open({
                    templateUrl: loginV2Tmp,

                    controller: 'loginV2Ctrl',

                    windowClass: 'login-modal'
                });
            };
        }
    };
});
