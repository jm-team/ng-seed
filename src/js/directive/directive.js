var app = require('../app');
var tmpHeader = require('../../page/common/header.html');
var tmpFooter = require('../../page/common/footer.html');
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
            }
        }
    }
});

app.directive('jmFooter', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: tmpFooter,
        controller:  function ($scope) {
        }
    }
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
    }
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
                    console.log($currentState)
                    workingState = getWorkingSatate($currentState)
                    if(workingState){
                        displayName = getStateDisplayName(workingState)
                        console.log(displayName)
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

                breadcrumbs.push({displayName: '首页', router:'home'})
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
                return false
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
    }
});


