var templateUrl = require('page/tab.html');

module.exports = {
    url: '/tab',
    templateUrl: templateUrl,
    /*@ngInject*/
    controller: function ($scope, $window) {

        $scope.alertMe = function () {
            setTimeout(function () {
                $window.alert('You\'ve selected the alert tab!');
            });
        };
    }
};