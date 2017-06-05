/*global require, angular*/

/**
 * [autoComplete 文字输入自动关联提示]
 *
 * @author zhoul
 * @description
 *
 * autoComplete 文字输入自动关联提示：
 *  指令属性详细：
 *      1) source: 关联的数据列表
 *      2) value: 选中的值
 *      3) placeholder: 输入框默认提示文字
 *      4) keyword: 输入的关键字
 *
 *  指令方法详细
 *      1) onChange(arg): 数据源改变的时候
 *
 *      2）onSelect(arg): 选中的回调
 *          arg:{
 *            $event: $event,  事件对象
 *            item: 选中的那一项
 *          }
 *
 * @example
 * <div auto-complete
 *      placeholder="search"
 *      value="vm.value"
 *      source="vm.results"
 *      on-select="vm.select(arg)"
 *      on-change="vm.handleChange()"
 *      keyword="vm.keyword"
 *      class="auto-complete-wrap">
 *  </div>
 *
 */

require("./index.scss");

//
angular.module('jmui.autoComplete', [])
  .directive('autoComplete', function($q, $compile, $http, $templateCache) {
    // 默认模板
    var tpl = '<ul class="jm-select-dropdown-menu" ng-show="source.length"> <li ng-class="{active: value === item}" ng-click="select($event, item)" ng-repeat="item in source">{{ item.query }}</li> </ul>';

    return {
      restrict: 'AE',
      replace: true,
      template: '<div><input placeholder="{{placeholder}}" type="text" class="form-control" ng-model="keyword"><div class="result-wrap" ></div></div>',
      scope: {
        source: '=',
        placeholder: '@',
        value: '=',
        onChange: '&',
        onSelect: '&',
        keyword: '='
      },
      link: function(scope, element, attrs) {
        var oInput = element.find('.form-control');
        var templateUrl = attrs.templateUrl;
        var oResultWrap = element.find('.result-wrap');

        // 获取模版内容
        function getTemplate(url) {
          var defer = $q.defer();
          if (url) {
            $http.get(templateUrl, {
              cache: $templateCache
            }).then(function(response) {
              defer.resolve(response.data);
            });
          } else {
            return $q.when(tpl);
          }
          return defer.promise;
        }

        getTemplate(templateUrl)
          .then(function(tplString) {
            return $compile(tplString)(scope);
          })
          .then(function(element) {
            oResultWrap.append(element);
          });

        // 监听文档点击事件
        // 文档点击的时候 关闭下拉提示框
        var documentClickEvent = scope.$on('document.click', function(ev) {
          element.removeClass('open');
        });


        oInput.on('focus', function() {
          element.addClass('open');
        });

        scope.select = function($event, item) {
          scope.onSelect({
            arg: {
              $event: $event,
              item: item
            }
          });
          element.removeClass('open');
        };

        oInput.on('keyup', function() {
          if (scope.keyword) {
            scope.$apply(function() {
              scope.source = [];
              scope.onChange().then(function(data) {
                scope.source = data;
                console.log(scope.source);
                element.addClass('open');
              });
            })
          } else {
            scope.$apply(function() {
              scope.source = [];
              element.removeClass('open');
            });
          }
        });

        // 作用域销毁 移除监听事件
        scope.$on('$destroy', function() {
          documentClickEvent();
          oInput.off('keyup');
        })
      }
    };
  });
