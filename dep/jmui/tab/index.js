/*global require, angular, console*/
/**
 * [tab选项卡组件]
 *
 * @author zhoul
 * 
 * pdf预览组件：
 *  指令属性详细：
 *      1) align: 选项卡位置 
 *      2) positon: 选项卡位置
 *
 * @example
 *  <div jm-pdf url="./dist/img/system/1.pdf"></div>
 *
 */
// tab选项卡
angular.module('jmui.tab', [])
  .directive('jmTabset', function () {
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
        align: '@',
        position: '@',
        contentClass: '@',
        trigger: '@',
        delayed: '@'
      },
      replace: true,
      template: '<div class="jm-tabs jm-tabs-{{align}} jm-tabs-{{position}}">' +
      '<header class="jm-tabs-header clearfix">' +
      '<ul ng-transclude></ul>' +
      '</header>' +
      '<div class="jm-tabs-content {{contentClass}}">' +
      '<section ng-class="{active: tab.selected}" ng-repeat="tab in tabs" jm-tab-content-transclude="tab"></section>' +
      '</div>' +
      '</div>',
      controller: function ($scope) {
        var tabs = $scope.tabs = [];
        this.trigger = $scope.trigger;
        this.delayed = $scope.delayed;

        // 添加一个tab
        this.addTab = function (tab) {
          if (tabs.length === 0) {
            tab.selected = true;
          } else if (tab.selected) {
            this.select(tab);
          }
          tabs.push(tab);
        };

        // 选中指定的一个
        this.select = function (tab) {
          angular.forEach(tabs, function (tab) {
            tab.selected = false;
          });
          tab.selected = true;
        };
      },
      compile: function () {
        return function postLink(scope, ele) {
          var children = ele.children();
          var ngHeader = angular.element(children[0]);
          var ulChild = ngHeader.find('ul').children();

          angular.forEach(ulChild, function (node) {
            if (isTabsetTitle(node)) {
              ngHeader.append(node);
            }
          });
          // ngHeader.append(ngHeader.find('ul').find('jm-tabset-title'));

          // 垂直排列并且 在右側顯示的
          if (scope.position === 'right') {
            if (scope.align === 'vertical') {
              ele.append(children[0]);
            } else {
              angular.element(children[0]).addClass('jm-tabs-header-right');
            }
          }
        };
      }
    };
  })
  .directive('jmTabContentTransclude', function () {
    return {
      restrict: 'AE',
      transclude: true,
      compile: function () {
        return function postLink(scope, ele, attrs) {
          var tab = scope.$eval(attrs.jmTabContentTransclude);
          tab.transcludeFn(tab.$parent, function (clone) {
            var headerNodes = [];
            var contentNodes = [];
            angular.forEach(clone, function (node) {
              // 判断是否有可以加入到tab-header中的标志
              if (isHeaderForContent(node)) {
                headerNodes.push(node);
              } else {
                contentNodes.push(node);
              }
            });
            ele.append(contentNodes);
            tab.headerNode = headerNodes;
          });
        };
      }
    };
  })
  .directive('jmTabsetTitle', function () {
    return {
      restrict: 'AE',
      template: '',
    };
  })
  .directive('jmTab', function ($timeout) {
    return {
      restrict: 'AE',
      require: '^jmTabset',
      scope: {
        heading: '@',
        selected: '=?',
        onSelect: '&',
        onAddTab: '&',
        uiSref: '@',
        href: '@'
      },
      replace: true,
      transclude: true,
      template: '<li ng-class="{active: selected}"><a  ng-click="selectTab()" jm-tab-header-transclude>{{heading}}</a></li>',
      compile: function (tEle, tAttrs, transclude) {
        return function postLink(scope, ele, attrs, tabSetController) {
          var ngA = ele.find('a');
          scope.timer = null;
          if (!scope.uiSref && scope.href) {
            ngA.attr('href', scope.href);
          }
          if (scope.uiSref) {
            ngA.attr('ui-sref', scope.uiSref);
          }
          scope.transcludeFn = transclude;
          scope.selected = scope.selected || false;
          tabSetController.addTab(scope);

          (scope.onAddTab || angular.noop)(scope);

          ele.on(tabSetController.trigger || 'click', function (ev) {
            $timeout.cancel(scope.timer);
            if (tabSetController.trigger === 'mouseover') {
              scope.timer = $timeout(function () {
                scope.$apply(function () {
                  tabSetController.select(scope);
                  (scope.onSelect || angular.noop)({
                    arg: {
                      ev: ev,
                      tab: scope
                    }
                  });
                });
              }, tabSetController.delayed | 0);
            } else {
              scope.$apply(function () {
                tabSetController.select(scope);
                (scope.onSelect || angular.noop)({
                  arg: {
                    ev: ev,
                    tab: scope
                  }
                });
              });
            }
          });

          ele.on('mouseout', function () {
            $timeout.cancel(scope.timer);
          });
        };
      }
    };
  })
  .directive('jmTabHeader', function () {
    return {
      restrict: 'AE',
      replace: true
    }
  })
  .directive('jmTabHeaderTransclude', function () {
    return {
      link: function (scope, ele) {
        var watchHeadernNode = scope.$watch('headerNode', function (nodes) {
          if (angular.isArray(nodes) && nodes.length > 0) {
            ele.html('');
          }
          ele.append(nodes);
        });

        scope.$on('$destory', function () {
          watchHeadernNode();
        });
      }
    };
  });

function isHeaderForContent(node) {
  return node.tagName && (
      node.hasAttribute('jm-tab-header') ||
      node.hasAttribute('data-jm-tab-header') ||
      node.tagName.toLowerCase() === 'jm-tab-header' ||
      node.tagName.toLowerCase() === 'data-jm-tab-header'
    );
}

function isTabsetTitle(node) {
  return node.tagName && (
      node.hasAttribute('jm-tabset-title') ||
      node.hasAttribute('data-jm-tabset-title') ||
      node.tagName.toLowerCase() === 'jm-tabset-title' ||
      node.tagName.toLowerCase() === 'data-jm-tabset-title'
    );
}
