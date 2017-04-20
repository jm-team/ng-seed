/*global require, angular*/
(function () {
  "use strict";

  var tmpCrumbs = require('./crumb.html');
  angular.module('jmui.crumbs', [])
    // 面包屑
    .directive('jmCrumbs', function ($state, $interpolate) {
      return {
        restrict: 'AE',
        templateUrl: function (element, attrs) {
          return attrs.templateUrl || tmpCrumbs;
        },
        scope: {
          displayNameProperty: '@',
          abstractProxyProperty: '@?'
        },
        link: function (scope, element, attrs) {
          scope.breadcrumbs = [];
          if ($state.$current.name !== '') {
            updateBreadcrumbsArray();
          }

          scope.$on('$stateChangeSuccess', function () {
            scope.breadcrumbs = [];
            updateBreadcrumbsArray();
          });

          function updateBreadcrumbsArray() {
            var breadcrumbs = [];
            var displayName;
            var $currentState = $state.$current;
            var self = $currentState.self || {};
            var workingState;

            while ($currentState && self.name) {
              workingState = getWorkingSatate($currentState);
              if (workingState) {
                displayName = getStateDisplayName(workingState);
                // console.log(displayName);
                if (displayName && !isWorkingStateInArray(displayName, breadcrumbs)) {
                  breadcrumbs.push({
                    displayName: displayName,
                    router: workingState.name
                  });
                }
              }
              $currentState = $currentState.parent;
              self = $currentState.self;
            }

            // breadcrumbs.push({
            //   displayName: '首页',
            //   router: 'home'
            // });
            breadcrumbs.reverse();
            scope.breadcrumbs = breadcrumbs;
          }

          function isWorkingStateInArray(displayName, arr) {
            var len = arr.length;
            while (len--) {
              var item = arr[len];
              if (item.displayName === displayName) {
                return true;
              }
            }
            return false;
          }

          // 获取可以工作的state
          function getWorkingSatate(currentState) {
            var proxyStateName;
            var workingState = currentState;

            // 当前是抽象状态
            if (currentState.abstract === true) {
              // scope.abstractProxyProperty == 'data.breadcrumbProxy'
              // currentState = {data:{breadcrumbProxy:'news.lists'}}
              // 判断是否有代理 可以在抽象状态中代理到某一个状态
              if (typeof scope.abstractProxyProperty !== 'undefined') {
                proxyStateName = getValueInObject(scope.abstractProxyProperty, currentState);
                if (proxyStateName) {
                  workingState = angular.copy($state.get(proxyStateName));
                  if (workingState) {
                    workingState.locals = currentState.locals;
                  }
                } else {
                  workingState = false;
                }
              } else {
                workingState = false;
              }
            }

            return workingState;
          }


          // str == 'data.breadcrumbProxy'
          // obj = {data:{breadcrumbProxy:'news.lists'}}
          function getValueInObject(str, obj) {
            var proxyArray = str.split('.');
            var propertyObject = obj;

            angular.forEach(proxyArray, function (item) {
              if (angular.isDefined(propertyObject[item])) {
                propertyObject = propertyObject[item];
              } else {
                propertyObject = undefined;
              }
            });

            return propertyObject;
          }


          function getStateDisplayName($state) {
            if (angular.isObject($state.data)) {
              var tmp = $state.data.displayName;
              var data = $state.locals.globals;
              // 解析插值字符串
              // tmp => {{news.title}}
              // $state.locals.golbals =>
              return $interpolate(tmp)($state.locals.globals);
            }
          }
        }
      };
    });
}());
