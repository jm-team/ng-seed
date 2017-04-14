var app = require('app');
var tmpFooter = require('./footer.html');

app.directive('jmFooter', function ($sce, $compile) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: tmpFooter
    };
});
