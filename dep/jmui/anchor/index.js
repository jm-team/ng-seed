/*global require, angular, scrollTo, self*/
/**
 * [AnchorSmoothScroll 锚点柔和滚动组件]
 *
 * @author zhoul
 * @description
 * 滚动条柔和的滚动到指定的锚点位置
 *
 * AnchorSmoothScroll 锚点柔和滚动组件：
 *  指令属性详细：
 *      1) visibilityHeight: 滚动高度达到此参数值才出现当前元素
 *      3) targetId: 目标元素的ID名称 (可选) 默认到文档顶部
 *
 *  指令方法详细
 *      1) onScrollFinsh(): 滚动结束回掉函数
 *
 * @example
 * <button
 *    class="jm-btn jm-btn-primary"
 *    on-scroll-finsh="scrollFinsh()"
 *    jm-anchor-smooth-scroll visibility-height="0">
 *      到顶部
 * </button>
 *
 */
angular.module('jmui.AnchorSmoothScroll', [])
  .directive('jmAnchorSmoothScroll', function($window, $timeout) {
    return {
      restrict: 'A',
      scope: {
        // 滚动高度达到此参数值才出现当前元素
        visibilityHeight: '@',

        // 滚动完成执行的回调函数
        onScrollFinsh: '&',

        // 指定滚动到ID为此参数的元素位置
        targetId: '@'
      },
      link: function(scope, element, attrs) {
        console.log(attrs);
        var visibilityHeight = scope.visibilityHeight || 400;
        var timer = null;

        // 计算滚动条当前位置
        function currentYPosition() {
          // Firefox, Chrome, Opera, Safari
          if (self.pageYOffset) {
            return self.pageYOffset;
          }

          // Internet Explorer 6 - standards mode
          if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
          }

          // Internet Explorer 6, 7 and 8
          if (document.body.scrollTop) {
            return document.body.scrollTop;
          }
          return 0;
        }

        // 计算需要滚动目标点的位置
        function elmYPosition(eID) {
          var elm = document.body;
          if (angular.isString(eID)) {
            elm = document.getElementById(eID);
          }
          var y = elm.offsetTop;
          var node = elm;
          while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
          }
          return y;
        }

        // 对比当前位置是否大于指定的高度
        // 如果大于就移除`ng-hide`类
        // 否则就添加`ng-hide`类
        function contrast() {
          if (visibilityHeight in attrs) {
            element.toggleClass('ng-hide', currentYPosition() >= visibilityHeight);
          }
        }

        // 执行判断是否显示当前元素
        contrast();

        // 点击执行滚动到指定目标位置
        element.on('click', function($event) {
          $event.preventDefault();
          // scroll参考
          // http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
          var onFinsh = angular.isFunction(scope.onScrollFinsh) ? scope.onScrollFinsh : angular.noop;
          var startY = currentYPosition();
          var stopY = elmYPosition(scope.targetId);
          var distance = stopY > startY ? stopY - startY : startY - stopY;

          if (distance < 100) {
            scrollTo(0, stopY);
            onFinsh();
            return;
          }
          var speed = Math.round(distance / 100);
          if (speed >= 20) {
            speed = 20;
          }
          var step = Math.round(distance / 25);
          var leapY = stopY > startY ? startY + step : startY - step;
          var timer = 0;
          var i = startY;
          if (stopY > startY) {
            for (startY; i < stopY; i += step) {
              setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
              leapY += step;
              if (leapY > stopY) {
                leapY = stopY;
              }
              timer += 1;
            }
          } else {
            for (startY; i > stopY; i -= step) {
              setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
              leapY -= step;
              if (leapY < stopY) {
                leapY = stopY;
              }
              timer += 1;
            }
          }

          // 执行结束
          setTimeout(onFinsh, timer * speed);
        });

        // 绑定scroll 事件
        angular.element($window).on('scroll', function() {
          $timeout.cancel(timer);
          timer = $timeout(contrast, 50);
        });

        //
        scope.$on('$destroy', function() {
          $timeout.cancel(timer);
          angular.element($window).off('scroll');
          element.off('click');
        });
      }
    };
  });
