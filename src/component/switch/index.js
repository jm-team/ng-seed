require('./index.scss');
var tmpl = require('./index.html');
// 滚动条柔和的滚动到指定的锚点位置
angular.module('jmui.switch', [])
    .directive('jmSwitch', function ($sce) {
        return {
            restrict: 'AE',
            templateUrl: tmpl,
            replace: true,
            scope: {
                name: '@',
                onChange: '&',
                ngModel: '='
            },
            controller: function ($scope, $element, $attrs) {
                var bgStyle = {};
                var width = parseInt($attrs.width) || 58;
                var onColor = $attrs.onColor || "#13ce66";
                var offColor = $attrs.offColor || "#ff4949";
                var disabledColor = $attrs.disabledColor || "#bfcbd9";
                var eCore = $element.find('.jm-switch__core');
                var eBtn = $element.find('.jm-switch__button');
                var btnWidth = parseInt(eBtn.getStyle('width'));
                var switchHeight = parseInt($element.getStyle('height'));
                var transOffX = (width - btnWidth - 5);
                var transY = Math.floor((switchHeight - btnWidth) / 2) - 1;

                $scope.onText = $sce.trustAsHtml($attrs.onText);
                $scope.offText = $sce.trustAsHtml($attrs.offText);

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
                        transform: "translate(" + transOffX + "px," + transY + "px)"
                    } : {
                        transform: "translate(2px," + transY + "px)"
                    })
                }

                // 初始化设置颜色
                setCoreStyle($scope.ngModel);

                // 监听`switch` 是否开启
                $scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        setCoreStyle(newVal);
                    }
                });

                // 监听是否禁用了`switch`
                $attrs.$observe('disabled', function (newVal, oldVal) {
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
                $scope.change = function ($event) {
                    $scope.onChange({
                        event: $event,
                        model: $scope.ngModel
                    });
                };
            }
        }
    });
