/*global require, angular*/
/**
 * [checkbox 复选框组件]
 *
 * @author zhoul
 * @description
 *
 *  checkbox 复选框组件：
 *  指令属性详细：
 *      1) checked: 是否选中
 *      2) viewValue: 复选框显示的值
 *      3) className: 类名称
 *      4) disabled: 是否禁用
 *
 *  指令方法详细
 *      1) onChange(arg): 数据源改变的时候
 *        arg: {
 *          $event: $event,  事件对象
 *          checked: checked 是否选中
 *        ｝
 * @example
 * <div
 *  jm-checkbox
 *  checked="vm.checked2"
 *  on-change="change(arg)"
 *  ng-disabled="true"
 *  view-value="Javascript">
 * </div>
 *
 */
require('./checkbox.scss');
var tmpCheckbox = require('./checkbox.html');
angular.module('jmui.checkbox', [])

  // 复选框
  .directive('jmCheckbox', function() {
    return {
      restrict: 'AE',
      templateUrl: tmpCheckbox,
      replace: true,
      scope: {
        checked: '=',
        // indeterminate: '=',
        onChange: '&',
        viewValue: '@',
        className: '@'
      },
      link: function(scope, element, attrs) {

        scope.disabled = false;

        scope.change = function($event, checked) {
          (scope.onChange || angular.noop)({
            arg: {
              $event: $event,
              checked: checked
            }
          });
        };

        var observe = attrs.$observe('ngDisabled', function(val) {
          scope.disabled = scope.$eval(val);
          if (!scope.disabled) {
            element.removeAttr('disabled')
          }
        });

        // 作用域销毁 执行解除observe
        scope.$on('$destroy', function() {
          observe();
        });
      }
    };
  })

  /**
   * [jmCheckboxGroup 复选框组组件]
   *
   * @author zhoul
   * @description
   *  基于jmCheckbox
   *  可以操作options中每一项的disabled来控制是否禁用
   *  jmCheckboxGroup 复选框组组件：
   *  指令属性详细：
   *      1) options: 显示的复选框数组
   *          {
   *            disabled: Boolean,  控制当前项是否禁用
   *            title: String,      checkbox显示的值
   *          }
   *      2) checkeds: 一组选中的值
   *
   *  指令方法详细
   *      1) onChange(arg): 数据源改变的时候
   *        arg: {
   *          checkeds: 当前选中的一组值
   *        ｝
   * @example
   * <div
   *  jm-checkbox-group
   *  on-change="vm.onChange()"
   *  options="vm.options4"
   *  checkeds="vm.checkeds4">
   * </div>
   *
   */
  .directive('jmCheckboxGroup', function() {
    return {
      restrict: 'AE',
      scope: {
        options: '=',
        onChange: '&',
        checkeds: '='
      },
      template: '<div jm-checkbox on-change="toggleOption(arg, opt)" ng-repeat="opt in options" checked="opt.checked"  view-value="{{opt.title}}" ng-disabled="{{opt.disabled}}"></div>',
      link: function(scope) {

        // 构造checkbox 数据
        function getOptions(options) {
          var newOptions = [];

          angular.forEach(options, function(option) {
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
        angular.forEach(scope.options, function(item) {
          if (scope.checkeds.indexOf(item.value) !== -1) {
            item.checked = true;
          }
        });

        // 切换选中/非选中
        scope.toggleOption = function(arg, opt) {
          if (angular.isArray(scope.checkeds)) {
            if (arg.checked) {
              scope.checkeds.push(opt.value)
            } else {
              var index = scope.checkeds.indexOf(opt.value);
              scope.checkeds.splice(index, 1);
            }
          }

          // 执行改变钩子函数
          (scope.onChange || angular.noop)({
            checkeds: scope.checkeds
          });
        }
      }
    }
  })
