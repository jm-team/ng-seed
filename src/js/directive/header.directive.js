var app = require('app');
var tmpHeader = require('./header.html');
var loginTmp = require('component/login/login.html');

app.directive('jmHeader', function() {
    return {
        restrict: 'AE',
        templateUrl: tmpHeader,
        replace: true,
        controller: function($modal, $scope) {
            $scope.modal = function($event) {
                $event.preventDefault();
                $modal.open({
                    templateUrl: loginTmp,

                    controller: 'loginCtrl',

                    windowClass: 'login-modal'
                });
            };
        }
    };
});
