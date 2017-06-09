var app = require('app');

app.directive('categoryTab', function(Util, $timeout, $location) {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      $timeout(function() {
        var active = element.parent().parent().find('a');
        var id = scope.list.categoryId;
        var categoryId = $location.search().categoryId;

        if (categoryId == id) {
          element.addClass('active');
        }
        element.on('click', function() {
          angular.forEach(active, function(item, index) {
            if (scope.$index == index) {
              angular.element(item).addClass('active');
            } else {
              angular.element(item).removeClass('active');
            }
          })
        })
      }, 0)
    }
  };
});

app.directive('industryTab', function(Util, $timeout, $location) {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      $timeout(function() {
        var active = element.parent().parent().find('a');
        var id = scope.list.industryId;
        var industryId = $location.search().industryId;

        if (industryId == id) {
          element.addClass('active');
        }
        element.on('click', function() {
          angular.forEach(active, function(item, index) {
            if (scope.$index == index) {
              angular.element(item).addClass('active');
            } else {
              angular.element(item).removeClass('active');
            }
          })
        })
      }, 0)
    }
  };
});
