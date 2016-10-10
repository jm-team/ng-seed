var app = require('../app');
var tmpHeader = require('../../page/common/header.html');
var tmpFooter = require('../../page/common/footer.html');

app.directive('jmHeader', [function () {
    return {
        restrict: 'AE',
        templateUrl: tmpHeader,
        replace: true,
        controller: ['$modal', '$scope', function ($modal, $scope) {
            $scope.modal = function ($event) {
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

app.directive('jmFooter', [function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: tmpFooter,
        controller: ['$scope', function ($scope) {
        }]
    }
}]);

app.directive('toggle', ['Util', function (Util) {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            var target = angular.element(Util.getByClassName(attrs.toggle));
            element.on('click', function () {
                target.toggleClass('animate-hidden');
            });
        }
    }
}]);


