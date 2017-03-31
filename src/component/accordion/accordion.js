// 手风琴
angular.module('jmui.accordion', [])
    .directive('jmAccordions', function () {
        return {
            restrict: 'AE',
            transclude: true,
            replace:true,
            template: '<div class="jm-accordions"><ul class="list-unstyled" ng-transclude></ul></div>',
            controller: function ($scope, $element, $attrs) {
                var self = this;
                var accordions = this.$accordions = [];

                this.toggleAccrdion = function (accordion) {
                    angular.forEach($scope.$accordions, function (item) {
                        if (accordion === item) {
                            item.open = !item.open;
                        } else {
                            item.open = false;
                        }
                    });
                };

                this.addAccordions = function (accordion) {
                    this.$accordions.push(accordion);
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
            template: '<li ng-click="toggle($event)" ng-class="{open: open}" class="jm-accordion" ng-transclude></li>',
            transclude: true,
            replace:true,
            scope: {
                heading: '@',
                onTolggle: '&'
            },
            link: function(scope, ele, attrs, ctrl){
                    scope.open = false;
                    ctrl.addAccordions(scope);

                    scope.toggle = function($event){
                        ctrl.toggleAccrdion(scope);
                    }
                    debugger;
                    
            },
           // link: function (scope, ele, attrs, jmAccordionsCtrl) {
                // var accordionContent = ele.find('section')[0];
                // jmAccordionsCtrl.addAccordions(scope);
                // scope.open = false;

                // var accordion = scope.$eval(attrs.jmTabContentTransclude);
                // debugger
                // ele.find('header').on('click', function (ev) {
                //     // angular.element(accordionContent).css({ 'display': 'block' });
                //     // var height = accordionContent.scrollHeight;
                //     // angular.element(accordionContent).css({ 'height': '0' })
                //     // setTimeout(function () {
                //     //     angular.element(accordionContent).css({
                //     //         'transition': 'height .3s ease',
                //     //         'height': height + 'px'
                //     //     });
                //     // }, 0);

                //     scope.$apply(function () {
                //         debugger;
                //         jmAccordionsCtrl.toggleAccrdion(scope);
                //         (scope.onTolggle || angular.noop)({ arg: { ev: ev, accordion: scope } });
                //     });
                // });
          //  }
        }
    });