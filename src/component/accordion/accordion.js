// 手风琴
angular.module('jmui.accordion', [])
    .directive('jmAccordions', function () {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            template: '<div class="jm-accordions"><ul class="list-unstyled" ng-transclude></ul></div>',
            controller: function ($scope, $element, $attrs) {
                var accordions = this.$accordions = [];
                // $scope.open = '123'
                this.toggleAccrdion = function (accordion) {
                    angular.forEach(accordions, function (item) {
                        if (accordion !== item) {
                            item.open = false;
                        }
                    });
                };

                this.addAccordions = function (accordion) {
                    accordions.push(accordion);
                };
            },
            link: function (scope, ele, attrs) {
            }
        }
    })
    .directive('jmAccordion', function () {
        return {
            restrict: 'AE',
            require: '^jmAccordions',
            template: '<li  ng-class="{open: open}" class="jm-accordion" ><div ng-transclude></div></li>',
            transclude: true,
            replace: true,
            controller: function ($scope, $transclude) {
                // console.log($transclude);
                console.log($scope)
            },

            compile: function (tEl, tAttr, transclude) {
                return function postlink(scope, ele, attrs, ctrl) {
                    scope.open = false;
                    ctrl.addAccordions(scope);
                    scope.toggle = function ($event) {
                        scope.open = !scope.open;
                        // console.log(ele.find('section'))
                        // // debugger
                        
                        // var s = ele.find('section').removeClass('ng-hide');

                        // setTimeout(function(){
                        //     s.css('height',getComputedStyle(s[0], false)['height']);
                        // },0)
                                       

                                     
                        
                        ctrl.toggleAccrdion(scope);


                    }
                }
            }
        }
    });