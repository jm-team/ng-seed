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
            controller: function ($scope, $element, $attrs) {

            },
            link: function (scope, element, attrs) {
                var type = attrs.type || 'success';
                var closable = attrs['closable'];
                var closeFn = scope.close || angular.noop;

                scope.closable = true;
                element.addClass('jm-alert-' + type);
                if (angular.equals(closable, "false")) {
                    scope.closable = false;
                }

                scope.close = function ($event) {
                    $animate.leave(element);
                    scope.$destroy();
                    closeFn({
                        event, $event
                    });
                };

            }
        }
    });
