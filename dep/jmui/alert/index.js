/*global require, angular*/
require("./index.scss");

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
        var closeFn = scope.close || angular.noop;

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
