require('./tooltip.scss');
// 文字提示
angular.module('jmui.tooltip', [])
  .directive('jmTooltip', function ($http, $window, $document, $timeout, $templateCache, $compile, $q) {
    return {
      restrict: 'AE',
      require: '^jmTooltip',
      scope: {
        onShow: '&',
        onHide: '&',
        popperClass: '@',
        content: '@',
        tTitle: '@'
      },
      controller: function ($scope, $element, $attrs) {
        var tpl = "<div class='tooltip' ng-show='show'>" + ($scope.tTitle ? "<h4 class='title'>{{ tTitle }}</h4>" : "") + "<div>" + ($scope.content) + "</div></div>"
        var _templateUrl = $attrs.templateUrl;
        var delay = $attrs.delay || 0;

        $scope.show = false;


        this.events = {
          "mouseover": "mouseout",
          "click": "click",
          "focus": "blur"
        }

        this.el = null;
        $scope.timer1 = {};
        $scope.timer2 = {};

        // 获取内容
        this.getTpl = function (_templateUrl) {
          var defer = $q.defer();
          // 判断是否有`templateUrl`
          if (_templateUrl) {
            $http.get(_templateUrl, {
              cache: $templateCache
            }).then(function (response) {
              defer.resolve(response.data);
            });
          } else {
            return $q.when(tpl);
          }
          return defer.promise;
        };

        // 计算当前元素距离文档的位置
        this.getOffset = function (element) {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width: boundingClientRect.width || element.prop('offsetWidth'),
            height: boundingClientRect.height || element.prop('offsetHeight'),
            top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
            left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
          };
        };

        // 添加/显示元素
        this.showEl = function () {
          if (this.el) {
            return $q.when(this.el);
          } else {
            return this.getTpl(_templateUrl).then(function (data) {
              this.el = $compile(angular.element(data))($scope);
              this.el.addClass($scope.popperClass);
              angular.element(document.body).append(this.el);


              this.el.on('mouseenter', function ($event) {
                $timeout.cancel($scope.timer1)
              });

              this.el.on('mouseleave', function ($event) {
                $scope.timer2 = $timeout(function () {
                  $scope.show = false;
                }, 80)
              });
              return this.el;
            }.bind(this));
          }
        };
      },
      link: function (scope, element, attrs, ngCtrl) {
        var trigger = attrs.trigger || 'mouseover';
        var offset = ngCtrl.getOffset(element);
        var delay = attrs.delay || 0;


        element.on(trigger, function ($event) {
          ngCtrl.showEl().then(function (el) {
            $timeout.cancel(scope.timer2);
            (scope.onShow || angular.noop)({ $event: $event, tooltip: ngCtrl, scope: scope });
            scope.show = true;
            $timeout(function () {
              $elOffset = ngCtrl.getOffset(el);
              el.css({
                opacity:1,
                filter:"alpha(opacity=100)",
                position: 'absolute',
                top: (offset.top - Math.max($elOffset.height, offset.height) - 10) + 'px',
                left: offset.left + 'px'
              });
            }, 0);
          })
        });

        element.on(ngCtrl.events[trigger], function () {
          scope.timer1 = $timeout(function () {
            scope.show = false;
          }, 80);
        });

        // 作用域删除 删除DOM
        scope.$on('$destroy', function () {
          if (angular.isObject(ngCtrl.el) && angular.isFunction(ngCtrl.el.remove)) {
            ngCtrl.el.remove();
          }
        });
      }
    }
  });