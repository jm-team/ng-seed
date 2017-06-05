var app = require('app');

app.directive('documentClick', function($rootScope) {
  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, element) {
      element.on('click', function() {
        $rootScope.$broadcast('document.click');
      })
    }
  };
});
