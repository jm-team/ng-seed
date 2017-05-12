/*global require, angular*/
/**
 * [alert 提示框组件]
 *
 * @author zhoul
 * @description
 *
 * alert提示组件：
 *  指令属性详细：
 *      1) type: 提示框风格类型（用于设置class）
 *      2) closable： 是否可以关闭提示框
 *
 *  指令方法详细
 *      1) closeFn(arg): 关闭提示框后的回调
 *          arg:{ event: event}
 *
 *
 *
 * @example
 *  <jm-alert type="success" closable="false">
 *    <div class="jm-alert-icon">
 *      <i class="jm-icon jm-icon-succed" style="font-size: 30px;"></i>
 *    </div>
 *
 *    <div class="jm-alert__content">
 *      <h4>成功提示的文案</h4>
 *      <p>文字说明文字说明文字说明文字说明文字说明文字说明</p>
 *    </div>
 *  </jm-alert>
 *
 */
require("./index.scss");
document.createElement('jm-alert');
// alert 提示框
angular.module('jmui.alert', [])
  .directive('jmAlert', function ($animate) {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<div class="jm-alert"> <div class="jm-alert__wrap" ng-transclude></div> <div class="jm-alert__close" ng-if="closable" ng-click="close($event)"><i class="jm-icon jm-icon-close"></i></div></div>',
      scope: {
        onClose: '&'
      },
      link: function (scope, element, attrs) {
        var type = attrs.type || 'success';
        var closable = attrs.closable;
        var closeFn = scope.onClose || angular.noop;
        // 是否显示关闭按钮
        scope.closable = true;
        // 根据传入的类型添加相应风格的类
        element.addClass('jm-alert-' + type);

        if (angular.equals(closable, "false")) {
          scope.closable = false;
        }

        scope.close = function ($event) {
          $animate.leave(element);
          // 执行关闭钩子函数
          closeFn({
            event: $event
          });
          // 关闭alert提示框, 销毁作用域
          scope.$destroy();
        };
      }
    };
  });
