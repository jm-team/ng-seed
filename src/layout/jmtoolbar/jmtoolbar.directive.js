var app = require('app');
var jmToolbar = require('./jmtoolbar.html');
require('./jmtoolbar.scss');

app.directive('jmToolbar', function ($window, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: jmToolbar,
        link: function(scope, element, attrs){
            var visibilityHeight = scope.visibilityHeight || 800;
            var elm = element[0];
            var $topBtn = angular.element(elm.lastElementChild || elm.lastChild);
            var $win = angular.element($window);
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
                var posY = currentYPosition();
                element.toggleClass(attrs.toggleClass || 'ng-hide', posY >= visibilityHeight);
            }

            // 执行判断是否显示当前元素
            contrast();

            // 点击执行滚动到指定目标位置
            $topBtn.on('click', function ($event) {
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
            $win.on('scroll', function () {
                $timeout.cancel(timer);
                timer = $timeout(contrast, 50);
            });

            //
            scope.$on('$destroy', function(){
                $timeout.cancel(timer);
                $win.off('scroll');
                $topBtn.off('click');
            });
        }
    };
});
