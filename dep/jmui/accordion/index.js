/*global require, angular*/

/**
 * [accordion 手风琴组件]
 *
 * @author zhoul
 * @description
 * accordion 手风琴组件
 *
 * @example
 *  <jm-accordions>
 *    <jm-accordion ng-repeat="item in vm.accordions">
 *      <header class="jm-accordion-title" ng-click="toggle($event)">
 *        <i class="jm-icon jm-icon-enter"></i>
 *          {{item.title}}
 *      </header>
 *
 *      <section class="jm-accordion-content" ng-show="open">
 *        <p>{{ item.content}}</p>
 *      </section>
 *    </jm-accordion>
 *  </jm-accordions>
 *
 */

require('./index.scss');
angular.module('jmui.accordion', [])
  .directive('jmAccordions', function () {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<div class="jm-accordions"><ul class="list-unstyled" ng-transclude></ul></div>',
      controller: function () {
        var accordions =  [];
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
      compile: function () {
        return function postlink(scope, ele, attrs, ctrl) {
          scope.open = false;
          ctrl.addAccordions(scope);
          scope.toggle = function () {
            scope.open = !scope.open;
            ctrl.toggleAccrdion(scope);
          };
        };
      }
    };
  });
