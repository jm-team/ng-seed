angular.module('jmui.scroll', [])
.directive('onLastRepeat', ['$timeout',function($timeout) {
        return function(scope, element, attrs) {
            if (scope.$last) $timeout(function(){
                scope.$emit(attrs.onLastRepeat);
            });
        };
    }])
.directive('scroll', ['$timeout', function ($timeout) {
    return {
        restrict: 'AE',
        scope: {
            height: "@", // 滚动容器的高度
            finish:"=",
            scrollable:'='
        },
        link: function (scope, element, attrs) {
            var timer = null;
            var top, half;

            scope.$watch('finish', function (value) {
                if (!value) return;
                if (!scope.scrollable) return;

                $timeout(function () {
                    top = 0;
                    half = element[0].offsetHeight / 2;
                    if (element[0].offsetHeight > scope.height) {
                        auto();
                    }
                }, 0)
            })

            element.on('mouseout', function () {
                if (element[0].offsetHeight > scope.height) {
                    auto();
                }
            })

            element.on('mouseover', function () {
                clearInterval(timer)
            })

            function move() {
                top--;
                if ( Math.abs(top) >= half ) {
                    top = 0;
                }

                element.css({
                    top: top+'px'
                })
            }

            function auto() {
                timer = setInterval(function () {
                    move()
                }, 50)
            }

            scope.$on(
                "$destroy",
                function( event ) {
                    clearInterval(timer)
                }
            );
        }
    }
}])