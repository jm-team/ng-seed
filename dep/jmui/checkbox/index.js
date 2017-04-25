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
                scope:{
                    checked:'=',
                    indeterminate:'=',
                    onChange:'&',
                    viewValue:'@',
                    className:'@'
                },
                link: function (scope, element, attrs) {

                    scope.change = function($event, checked){
                        (scope.onChange || angular.noop)($event, checked);
                    };

                    attrs.$observe('disabled', function(val){
                       scope.disabled = scope.$eval(val);
                       console.log(scope.disabled)
                    });
                }
            };
        })
        .directive('jmCheckboxGroup', function(){

        })
}());
