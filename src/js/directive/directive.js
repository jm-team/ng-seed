var app = require('../app');
var tmp = require('../../page/directive/header.html');
app.directive('jmHeader', [function(){
    return {
        restrict:'AE',
        templateUrl: tmp,
        controller:['$modal','$scope', function($modal, $scope){
            $scope.modal= function($event) {
                $event.preventDefault();
                $modal.open({
                    templateUrl: app.tmps.loginTmp,

                    controller: 'loginCtrl',

                    windowClass: 'login-modal'
                });
            }
        }]
    }
}]);
