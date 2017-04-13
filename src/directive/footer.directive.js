var app = require('app');
var tmpFooter = require('./footer.html');

app.directive('jmFooter', function ($sce) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: tmpFooter,
        
        controller: function ($scope) {
            $scope.script = $sce.trustAsJs("alert(1)")
            console.log($scope.script)
        }
    };
});
