var app = require('app');
var tmpFooter = require('./footer.html');

app.directive('jmFooter', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: tmpFooter
  };
});
