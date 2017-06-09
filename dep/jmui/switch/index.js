/* global require, angular*/
/**
 * [switch 开关组件]
 *
 * @author zhoul
 * @description
 * <jm-switch
                width="58"
                on-text="<i class='jm-icon jm-icon-fullscreen'></i>"
                on-color="#68b828"
                off-text="<i class='jm-icon jm-icon-111'></i>"
                off-color="#ea6262"
                name="checked"
                ng-model="vm.on">
            </jm-switch>
 *
 *
 * switch 开关组件:
 *  指令属性详细：
 *      1) width: 组件宽度
 *      2) ngModel: 开关的model值
 *      3）on-text: switch 打开时的文字
 *      4）on-color: switch 打开时的背景色
 *      5) off-text: switch 关闭时的文字
 *      6) off-color: switch 关闭时的背景色
 *      7) name: switch 对应的 name 属性
 *      7) disabled: 是否禁用
 *
 * 指令方法：
 *    1）onChange(arg): 开关值改变回调
 *        arg:{
 *          event: $event,
 *          model: $scope.ngModel
 *        }
 * @example
 *  <jm-switch
 *    width="58"
 *    on-text="开"
 *    on-color="#68b828"
 *    off-text="关"
 *    off-color="#ea6262"
 *    name="checked"
 *    ng-model="on">
 *  </jm-switch>
 *
 */
var tmpl = require('./index.html');
require('./index.scss');
document.createElement('jm-switch');
// 滚动条柔和的滚动到指定的锚点位置
angular.module('jmui.switch', [])
  .directive('jmSwitch', function($sce) {
    return {
      restrict: 'AE',
      templateUrl: tmpl,
      replace: true,
      scope: {
        onChange: '&',
        ngModel: '='
      },
      controller: function($scope, $element, $attrs) {
        var width = parseInt($attrs.width, 10) || 58;
        var onColor = $attrs.onColor || "#13ce66";
        var offColor = $attrs.offColor || "#ff4949";
        var disabledColor = $attrs.disabledColor || "#bfcbd9";
        var eCore = $element.find('.jm-switch__core');
        var eBtn = $element.find('.jm-switch__button');
        var leftIcon = $element.find('.jm-switch__left .text');
        var rightIcon = $element.find('.jm-switch__right .text');
        var btnWidth = parseInt(eBtn.getStyle('width'), 10);
        var switchHeight = parseInt($element.getStyle('height'), 10);
        var transOffX = (width - btnWidth - 5);
        var transY = Math.floor((switchHeight - btnWidth) / 2) - 1;
        var iconOnName = $attrs.iconOn;
        var iconOffName = $attrs.iconOff;

        $scope.onText = $sce.trustAsHtml($attrs.onText);
        $scope.offText = $sce.trustAsHtml($attrs.offText);

        if (iconOnName) {
          leftIcon.addClass('jm-icon jm-icon-' + iconOnName)
        }

        if (iconOffName) {
          rightIcon.addClass('jm-icon jm-icon-' + iconOffName)
        }

        // 设置`switch`宽度
        $element.css({
          width: width + 'px'
        });

        // 设置 `switch` 色值
        function setCoreStyle(model) {
          eCore.css(model ? {
            "background-color": onColor
          } : {
            "background-color": offColor
          });
          eBtn.css(model ? {
            left: transOffX + 'px',
            top: transY + 'px'
          } : {
            left: "2px",
            top: transY + 'px'
          });
        }

        // 初始化设置颜色
        setCoreStyle($scope.ngModel);

        // 监听`switch` 是否开启
        var watchModel = $scope.$watch('ngModel', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            setCoreStyle(newVal);
          }
        });

        // 监听是否禁用了`switch`
        var observerDisabled = $attrs.$observe('disabled', function(newVal, oldVal) {
          $scope.disabled = newVal;
          if (newVal !== oldVal) {
            if (newVal) {
              eCore.css({
                "background-color": disabledColor
              });
            } else {
              setCoreStyle($scope.ngModel);
            }
          }
        });

        // `switch`值改变
        $scope.change = function($event) {
          $scope.onChange({
            event: $event,
            model: $scope.ngModel
          });
        };

        $scope.$on('$destory', function() {
          watchModel();
          observerDisabled();
        });
      }
    };
  });
