/*global require, angular*/

require('./checkbox.scss');
var tmpCheckbox = require('./checkbox.html');
angular.module('jmui.checkbox', [])

  // 复选框
  .directive('jmCheckbox', function () {
    return {
      restrict: 'AE',
      templateUrl: tmpCheckbox,
      replace: true,
      scope: {
        checked: '=',
        indeterminate: '=',
        onChange: '&',
        viewValue: '@',
        className: '@'
      },
      link: function (scope, element, attrs) {

        scope.disabled = false;

        scope.change = function ($event, checked) {
          (scope.onChange || angular.noop)({arg: {$event: $event, checked: checked}});
        };

        var observe = attrs.$observe('ngDisabled', function (val) {
          scope.disabled = scope.$eval(val);
          if (!scope.disabled) {
            element.removeAttr('disabled')
          }
        });

        // 作用域销毁 执行解除observe
        scope.$on('$destroy', function(){
          observe();
        });
      }
    };
  })

  // 复选框组
  .directive('jmCheckboxGroup', function () {
    return {
      restrict: 'AE',
      scope: {
        options: '=',
        onChange: '&',
        checkeds: '='
      },
      template: '<div jm-checkbox on-change="toggleOption(arg, opt)" ng-repeat="opt in options" checked="opt.checked"  view-value="{{opt.title}}" ng-disabled="{{opt.disabled}}"></div>',
      link: function (scope) {

        // 构造checkbox 数据
        function getOptions(options) {
          var newOptions = [];

          angular.forEach(options, function (option) {
            if (typeof option === 'string') {
              newOptions.push({
                title: option,
                value: option
              });
            }
          });

          if (newOptions.length > 0) {
            return newOptions;
          } else {
            return options;
          }
        }

        scope.options = getOptions(scope.options);

        // 对选中的checkbox 做标记
        // 以便在view中展示勾选效果
        angular.forEach(scope.options, function (item) {
          if (scope.checkeds.indexOf(item.value) !== -1) {
            item.checked = true;
          }
        });

        // 切换选中/非选中
        scope.toggleOption = function (arg, opt) {
          if (angular.isArray(scope.checkeds)) {
            if (arg.checked) {
              scope.checkeds.push(opt.value)
            } else {
              var index = scope.checkeds.indexOf(opt.value);
              scope.checkeds.splice(index, 1);
            }
          }

          // 执行改变钩子函数
          (scope.onChange || angular.noop)();
        }
      }
    }
  })
