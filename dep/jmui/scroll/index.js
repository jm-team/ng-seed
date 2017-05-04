/*global require, angular*/
angular.module('jmui.scroll', [])
  .directive('onLastRepeat', ['$timeout', function ($timeout) {
    return function (scope, element, attrs) {
      if (scope.$last) {
        $timeout(function () {
          scope.$emit(attrs.onLastRepeat);
        });
      }
    };
  }])
  .directive('scroll', ['$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      scope: {
        height: "@", // 滚动容器的高度
        finish: "=",
        scrollable: '='
      },
      link: function (scope, element, attrs) {
        var timer = null;
        var top;
        var half;
        var $self = angular.element(element);
        var watchFn = angular.noop;

        // 在滚动内容外添加一个滚动容器
        $self.wrap("<div class='scroll-container' style='height: " + scope.height + "px;overflow: hidden;position: relative;'></div>");

        // 设置滚动内容样式
        $self.css({
          "width": "100%",
          "position": "absolute",
          "left": "0",
          "top": "0"
        });

        watchFn = scope.$watch('finish', function (value, oldVal) {
          if (!value || !scope.scrollable || oldVal === value) {
            return false;
          }
          $timeout(function () {
            top = 0;
            half = element[0].offsetHeight / 2;
            if (element[0].offsetHeight > scope.height) {
              auto();
            }

            element.on('mouseleave', function () {
              if (element[0].offsetHeight > scope.height) {
                auto();
              }
            });
            element.on('mouseenter', function () {
              clearInterval(timer);
            });
          }, 0);
        });


        function move() {
          top -= 1;
          if (Math.abs(top) >= half) {
            top = 0;
          }

          element.css({
            top: top + 'px'
          });
        }

        function auto() {
          clearInterval(timer);
          timer = setInterval(function () {
            move();
          }, 50);
        }

        scope.$on(
          "$destroy",
          function (event) {
            clearInterval(timer);
            watchFn();
          }
        );
      }
    };
  }]);
