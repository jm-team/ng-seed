var app = require('../app');
var tmpHeader = require('../../page/common/header.html');
var tmpFooter = require('../../page/common/footer.html');
var tmpPage = require('../../page/common/page.html');
var tmpCrumbs = require('../../page/common/crumbs.html');


app.directive('jmHeader', function () {
    return {
        restrict: 'AE',
        templateUrl: tmpHeader,
        replace: true,
        controller:  function ($modal, $scope) {
            $scope.modal = function ($event) {
                $event.preventDefault();
                $modal.open({
                    templateUrl: app.tmps.loginTmp,

                    controller: 'loginCtrl',

                    windowClass: 'login-modal'
                });
            };
        }
    };
});

app.directive('jmFooter', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: tmpFooter,
        controller:  function ($scope) {
        }
    };
});

app.directive('toggle',  function (Util) {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            var target = angular.element(Util.getByClassName(attrs.toggle));
            element.on('click', function () {
                target.toggleClass('animate-hidden');
            });
        }
    };
});


// 面包屑
app.directive('jmCrumbs',function($state, $interpolate,$timeout){
    return {
        restrict:'AE',
        templateUrl: function(element, attrs){
           return attrs.templateUrl || tmpCrumbs;
        },
        scope:{
            displayNameProperty:'@',
            abstractProxyProperty:'@?'
        },
        link: function(scope, element, attrs){
            scope.breadcrumbs = [];

            if($state.$current.name !== ''){
                updateBreadcrumbsArray();
            }

            scope.$on('$stateChangeSuccess', function(){
                scope.breadcrumbs = [];
                updateBreadcrumbsArray();
            });

            function updateBreadcrumbsArray(){
                var breadcrumbs = [];
                var displayName;
                var $currentState = $state.$current;
                var self = $currentState.self || {};
                while($currentState && self.name){
                    console.log($currentState);
                    workingState = getWorkingSatate($currentState);
                    if(workingState){
                        displayName = getStateDisplayName(workingState);
                        console.log(displayName);
                        if(displayName && !isWorkingStateInArray(displayName, breadcrumbs)){
                            breadcrumbs.push({
                                displayName: displayName,
                                router: workingState.name
                            });
                        }
                    }
                    $currentState = $currentState.parent;
                    self = $currentState.self;
                }

                breadcrumbs.push({displayName: '首页', router:'home'});
                breadcrumbs.reverse();
                scope.breadcrumbs = breadcrumbs;
            }

            function isWorkingStateInArray(displayName, arr){
                var len = arr.length;
                while(len--){
                    var item = arr[len];
                    if(item.displayName === displayName){
                        return true;
                    }
                }
                return false;
            }

            // 获取可以工作的state
            function getWorkingSatate(currentState){
                var proxyStateName ;
                var workingState = currentState;

                // 当前是抽象状态
                if(currentState.abstract === true){
                    // scope.abstractProxyProperty == 'data.breadcrumbProxy'
                    // currentState = {data:{breadcrumbProxy:'news.lists'}}
                    // 判断是否有代理 可以在抽象状态中代理到某一个状态
                    if(typeof scope.abstractProxyProperty !== 'undefined'){
                        proxyStateName = getValueInObject(scope.abstractProxyProperty, currentState);
                        if(proxyStateName){
                            workingState = angular.copy($state.get(proxyStateName));
                            if(workingState){
                                workingState.locals = currentState.locals;
                            }
                        }else{
                            workingState = false;
                        }
                    }else{
                        workingState = false;
                    }
                }

                return workingState;
            }


            // str == 'data.breadcrumbProxy'
            // obj = {data:{breadcrumbProxy:'news.lists'}}
            function getValueInObject(str, obj){
                var proxyArray = str.split('.');
                var propertyObject = obj;

                angular.forEach(proxyArray, function(item){
                    if(angular.isDefined(propertyObject[item])){
                        propertyObject = propertyObject[item];
                    }else{
                        propertyObject = undefined;
                    }
                });

                return propertyObject;
            }


            function getStateDisplayName($state){
                var tmp = $state.data.displayName;
                var data = $state.locals.globals;

                // 解析插值字符串
                return $interpolate(tmp)($state.locals.globals);
            }
        }
    };
});

/**
 * [分页组件]
 * @description
 *
 * 基础的分页组件：
 *  指令属性详细：
 *      1) itemsPerPage:每页最大条数用于计算总页数 默认10
 *      2) totalPage： 总页数
 *      3) currentPage: 当前页
 *      4) maxSize: 最大页码
 *      5) nextText: 下一页的显示文本
 *      6) previousText: 上一页的显示文本
 *      7) firstText: 首页显示文本
 *      8) lastText: 尾页显示文本
 *      9) directionLinks: 是否显示上一页和下一页
 *      11) totalItems: 总条数
 *
 *  指令方法详细
 *      1) onSelectPage(result): 选择页码的回调
 *          result:{ ev: event, currentPage: page}
 *
 *
 *
 *
 * @example
 *  <jm-pagination
 *      total-page="numPages"
 *      boundary-links="true"
 *      on-select-page="selectPage(page)"
 *      previous-text="Previous"
 *      next-text="Next"
 *      max-size="5"
 *      current-Page="currentPage">
 *  </jm-pagination>
 *
 */
app.directive('jmPagination', function($parse){
    return {
        restrict:'AE',
        templateUrl:tmpPage,
        scope:{
            // 总页数
            totalPage:'=',

            // 当前页
            currentPage:'=',
            // 页码改变回调方法
            onSelectPage:'&'
        },
        controller: function($scope, $element, $attrs){
            console.log($attrs);
            // 配置屬性
            angular.extend($scope, {
                pages:[],
                itemsPerPage:$attrs.itemsPerPage ||10,
                maxSize: parseInt($attrs.maxSize) || 5,
                totalItems: $attrs.totalItems,
                nextText: $attrs.nextText,
                previousText: $attrs.previousText,
                firstText: $attrs.firstText,
                lastText: $attrs.lastText,
                directionLinks: $attrs.directionLinks || true
            });



            // 迴調方法
            angular.extend($scope, {
                init:function(){
                    var self = this;
                    if($attrs.itemsPerPage){
                        $scope.totalPage = this.calculateTotalPage();
                    }

                    // 每页大小改变
                    this.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
                      self.itemsPerPage = parseInt(value, 10);
                      $scope.totalPage = self.calculateTotalPage();
                    });
                },

                calculateTotalPage : function() {
                  var totalPage = $scope.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
                  return Math.max(totalPage || 0, 1);
                },
                // 初始化分頁
                makePage: function(currentPage, totalPages){
                    var maxSize = $scope.maxSize;
                    var start = 2;
                    var end = start + maxSize;
                    $scope.pages = [];

                    // 判斷总页码是否小于最大显示页
                    if(totalPages < maxSize){
                        end = totalPages - 1;
                    }else{
                        if(currentPage <= maxSize){
                            start = (start<2)?2:start;
                        }else if(currentPage > totalPages-maxSize){
                            start = totalPages-maxSize;
                        }else{
                            start = currentPage - Math.floor(maxSize/2);
                        }
                    }

                    while(maxSize--){
                        if(start < totalPages){
                            $scope.pages.push({index: start, isActive: currentPage == start});
                        }
                        start++;
                    }
                },
                selectPrevious: function($event){
                    var p = $scope.currentPage-1;
                    $scope.setPage($event, p < 1 ? 1 : p);
                    ($scope.onSelectPrevious||angular.noop)({event: $event});
                },

                selectNext: function($event){
                    var p = $scope.currentPage+1;
                    $scope.setPage($event, p >$scope.totalPage ? $scope.totalPage : p);
                    ($scope.onSelectNext||angular.noop)({event: $event});
                },

                setPage: function($event, p){
                    $event.preventDefault();
                    if(p !== $scope.currentPage){
                        $scope.currentPage = p;
                        ($scope.onSelectPage||angular.noop)({page:{event: $event, currentPage: p}});
                        $scope.makePage(p, $scope.totalPage);
                    }
                }
            });
            $scope.init();
            // 监视总页数改变 总页数改变初始化分页
            $scope.$watch('totalPage', function(value){
                console.log('totalPage change' + $scope.totalPage )
                $scope.makePage($scope.currentPage, $scope.totalPage);
            });
        }
    };
});
