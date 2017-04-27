/*global require, angular*/
(function () {
    "use strict";

    require("./index.scss");

    // alert 提示框
    angular.module('jmui.autoComponent', [])
        .directive('autoComponent', function ($animate) {
            return {
                restrict: 'AE',
                replace: true,
                template:'<div><input placeholder="{{placeholder}}" type="text" class="form-control" ng-model="keyword"><div class="result-wrap" ><ul class="jm-select-dropdown-menu" ng-show="source.length"> <li ng-class="{active: value === item}" ng-click="select($event, item)" ng-repeat="item in source">{{ item.query }}在<a href="#">{{ item.category }}</a>区块中<span class="global-search-item-count">约{{item.count}}个结果</span> </li> </ul></div></div>',
                scope: {
                    source:'=',
                    placeholder:'@',
                    value:'=',
                    onChange:'&',
                    onSelect:'&',
                    keyword:'='
                },
                controller: function ($scope, $element, $attrs) {

                },

                link: function (scope, element, attrs) {
                    var oInput = element.find('.form-control');

                    scope.$on('document.click', function(ev){
                        console.log(ev);
                        element.removeClass('open');
                    });

                    oInput.on('focus', function(){
                        element.addClass('open');
                    });

                    scope.select = function($event, item){
                        scope.onSelect({arg: {
                            $event: $event,
                            item: item
                        }});

                        element.removeClass('open');
                    }

                    oInput.on('input', function(ev){
                        if(scope.keyword){
                            scope.$apply(function(){
                                scope.source = [];
                                scope.onChange().then(function(data){
                                    scope.source = data;
                                    console.log(scope.source);
                                    element.addClass('open');
                                });
                            })
                        }else{
                            scope.$apply(function() {
                                scope.source = [];
                                element.removeClass('open');
                            });
                        }
                    });
                }
            };
        })
}());


