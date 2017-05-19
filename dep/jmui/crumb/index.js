/*global require, angular*/
/**
 * [crumbs 面包屑]
 *
 * @author zhoul
 * @description
 *
 * crumbs 面包屑：
 *  指令属性详细：
 *      1) abstractProxyProperty: 静态路由需要代理到的路由
 *      2）index-crumb： 最顶层的路由配置对象
 *
 *
 * @example
 * <div 
 *    jm-crumbs 
 *    abstract-proxy-property="data.breadcrumbProxy" 
 *    index-crumb="{{vm.indexCrumb}}">
 * </div>
 * 
 * 路由中的配置 添加一个data 属性
 * data:{
 *   breadcrumbProxy: 'components.crumb',  // 路由地址
 *   displayName: '面包屑'  // 面包屑显示的名称
 * }
 *
 */
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
        abstractProxyProperty: '@'
      },
      link: function (scope, element, attrs) {

        scope.breadcrumbs = [];

        if ($state.$current.name !== '') {
          updateBreadcrumbsArray();
        }

        var stateChange = scope.$on('$stateChangeSuccess', function () {
          scope.breadcrumbs = [];
          updateBreadcrumbsArray();
        });

        // 作用域销毁 接触监听
        scope.$on('$destroy', function () {
          stateChange();
        });

        function updateBreadcrumbsArray() {
          var custromCrumbs = scope.$eval(attrs.indexCrumb);
          var breadcrumbs = [];
          var displayName;
          var $currentState = $state.$current;
          var self = $currentState.self || {};
          var workingState;

          while ($currentState && self.name) {
            workingState = getWorkingSatate($currentState);
            if (workingState) {
              displayName = getStateDisplayName(workingState);
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

          if (angular.isObject(custromCrumbs)) {
            breadcrumbs.push(custromCrumbs);
          }
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
          // if (currentState.abstract === true) {
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
          // }

          return workingState;
        }


        // str == 'data.breadcrumbProxy'
        // obj = {data:{breadcrumbProxy:'news.lists'}}
        function getValueInObject(str, obj) {
          var proxyArray = str.split('.');
          var propertyObject = obj;

          angular.forEach(proxyArray, function (item) {

            if (angular.isObject(propertyObject) && angular.isDefined(propertyObject[item])) {
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
            // 解析插值字符串
            // tmp => {{news.title}}
            // $state.locals.golbals =>
            return $interpolate(tmp)($state.locals.globals);
          }
        }
      }
    };
  });
