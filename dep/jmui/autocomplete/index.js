/*global require, angular*/

require("./index.scss");

// alert 提示框
angular.module('jmui.autoComplete', [])
  .directive('autoComplete', function ($q, $compile, $http, $templateCache) {
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
      link: function (scope, element, attrs) {
        var oInput = element.find('.form-control');
        var templateUrl = attrs.templateUrl;
        var oResultWrap = element.find('.result-wrap');

        function getTemplate(url){
          var defer = $q.defer();

          if(url){
            $http.get(templateUrl, {
              cache: $templateCache
            }).then(function (response) {
              defer.resolve(response.data);
            });

          }else{
            return $q.when(tpl);
          }
          return defer.promise;
        }

        getTemplate(templateUrl).then(function(tplString){
          return $compile(tplString)(scope);
        }).then(function(element){
          oResultWrap.append(element);
          console.log(element)
        });

        // 监听文档点击事件
        // 文档点击的时候 关闭下拉提示框
        var documentClickEvent = scope.$on('document.click', function (ev) {
          console.log(ev);
          element.removeClass('open');
        });


        var oInputFocusEvent = oInput.on('focus', function () {
          element.addClass('open');
        });

        scope.select = function ($event, item) {
          scope.onSelect({
            arg: {
              $event: $event,
              item: item
            }
          });
          element.removeClass('open');
        };

        oInput.on('keyup', function () {
          if (scope.keyword) {
            scope.$apply(function () {
              scope.source = [];
              scope.onChange().then(function (data) {
                scope.source = data;
                console.log(scope.source);
                element.addClass('open');
              });
            })
          } else {
            scope.$apply(function () {
              scope.source = [];
              element.removeClass('open');
            });
          }
        });

        // 作用域销毁 移除监听事件
        scope.$on('$destroy', function () {
          documentClickEvent();
          oInputFocusEvent();
        })
      }
    };
  });


