/*global require, angular*/
(function () {
    "use strict";
    require('./checkbox.scss');
    var tmpCheckbox = require('./checkbox.html');
    angular.module('jmui.checkbox', [])
    // 复选框
        .directive('jmCheckbox', function () {
            return {
                restrict: 'AE',
                templateUrl: tmpCheckbox,
                replace: true,
                scope: {
                    checked: '=',
                    indeterminate: '=',
                    onChange: '&',
                    viewValue: '@',
                    className: '@'
                },
                link: function (scope, element, attrs) {
                    scope.disabled = false;
                    scope.change = function ($event, checked) {
                        (scope.onChange || angular.noop)({arg: {$event: $event, checked: checked}});
                    };

                    attrs.$observe('ngDisabled', function (val) {
                        scope.disabled = scope.$eval(val);
                        if(!scope.disabled){
                            element.removeAttr('disabled')
                        }
                        console.log(scope.disabled)
                    });
                }
            };
        })
        .directive('jmCheckboxGroup', function () {
            return {
                restrict: 'AE',
                scope: {
                    options: '=',
                    onChange: '&',
                    checkeds: '='
                },
                template: '<div jm-checkbox on-change="toggleOption(arg, opt)" ng-repeat="opt in options" checked="opt.checked"  view-value="{{opt.title}}" ng-disabled="{{opt.disabled}}"></div>',
                link: function (scope, element, attrs) {

                    function getOptions(options) {

                        var newOptions = [];

                        angular.forEach(options, function (option) {
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

                    angular.forEach(scope.options, function (item) {
                        if (scope.checkeds.indexOf(item.value) !== -1) {
                            item.checked = true;
                        }
                    });

                    scope.toggleOption = function (arg, opt) {
                        if (angular.isArray(scope.checkeds)) {
                            if (arg.checked) {
                                scope.checkeds.push(opt.value)
                            } else {
                                var index = scope.checkeds.indexOf(opt.value);
                                scope.checkeds.splice(index, 1);
                            }
                        }

                        (scope.onChange || angular.noop)();
                    }
                }
            }
        })
}());
