/*global require, angular*/
require('./index.scss');
angular.module('jmui.accordion', [])
  .directive('jmAccordions', function () {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<div class="jm-accordions"><ul class="list-unstyled" ng-transclude></ul></div>',
      controller: function ($scope, $element, $attrs) {
        var accordions = this.$accordions = [];
        // $scope.open = '123'
        this.toggleAccrdion = function (accordion) {
          angular.forEach(accordions, function (item) {
            if (accordion !== item) {
              item.open = false;
            }
          });
        };

        this.addAccordions = function (accordion) {
          accordions.push(accordion);
        };
      },
      link: function (scope, ele, attrs) {
      }
    };
  })
  .directive('jmAccordion', function () {
    return {
      restrict: 'AE',
      require: '^jmAccordions',
      template: '<li  ng-class="{open: open}" class="jm-accordion" ><div ng-transclude></div></li>',
      transclude: true,
      replace: true,
      controller: function ($scope, $transclude) {
      },

      compile: function (tEl, tAttr, transclude) {
        return function postlink(scope, ele, attrs, ctrl) {
          scope.open = false;
          ctrl.addAccordions(scope);
          scope.toggle = function ($event) {
            scope.open = !scope.open;
            ctrl.toggleAccrdion(scope);
          };
        };
      }
    };
  });
