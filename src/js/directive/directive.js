/**
 * Created by Administrator on 2016/7/4 0004.
 */
var app = require('app');

/**
 * app - 鼠标滚动固定某一块
 *
 * @param  {type} 'headFixed'     description
 * @param  {type} ['$state'       description
 * @param  {type} '$rootScope'    description
 * @param  {type} function($state description
 * @param  {type} $rootScope      description
 * @return {type}                 description
 */
app.directive('headFixed', ['$state', '$rootScope', function($state, $rootScope) {
    return {
        restrict: 'AE',
        scope: {
            top: '@', // 滚动距离触发fixed
            fixclass: '@',
            start: '='
        },
        link: function(scope, element, attrs) {
            var scrollTop, startOffsetTop, timer, startElement;
            var doc = document.documentElement;
            var oBody = document.body;
            var fixedElement = angular.element(element);
            var prv = '';

            // 获取元素距离文档的高度
            function getOffset(ele, target) {
                var offset = {
                    top: 0,
                    left: 0
                };
                while (ele || (ele && ele !== target)) {
                    offset.top += ele.offsetTop;
                    offset.left += ele.offsetLeft;
                    ele = ele.offsetParent;
                }
                return offset;
            }

            function watchScroll() {
                scrollTop = doc.scrollTop || oBody.scrollTop;
                if (scrollTop >= startOffsetTop) {
                    fixedElement.addClass(scope.fixclass || 'fix');
                } else if (scrollTop <= startOffsetTop) {
                    fixedElement.removeClass(scope.fixclass || 'fix');
                }
            }

            if (attrs.top && angular.isNumber(parseInt(attrs.top))) {
                startOffsetTop = parseInt(attrs.top);
            }

            angular.element(window).on('scroll', function() {
                if (angular.isUndefined(startOffsetTop) || scope.start !== prv) {
                    startElement = document.querySelector(scope.start);
                    startOffsetTop = startElement && (getOffset(startElement).top + startElement.offsetHeight);
                }
                clearTimeout(timer);
                if (startOffsetTop) {
                    timer = setTimeout(watchScroll, 30);
                    prv = scope.start;
                }
            });
        }
    }
}]);




/**
 * app - 公共头部
 *
 * @param  {type} 'jytTobar' description
 * @param  {type} [function( description
 * @return {type}            description
 */
app.directive('jytTobar', [function(){
  return {
    restrict:'AE',
    templateUrl:'/dist/page/header.html',
    controller: function($scope, $element, $attrs){

    }
  }
}]);


/**
 * app - 公共尾部
 *
 * @param  {type} 'jytFooter'  description
 * @param  {type} ['API'       description
 * @param  {type} function(API description
 * @return {type}              description
 */
app.directive('jytFooter', ['API', function(API){
  return {
    restrict:'AE',
    templateUrl:'/dist/page/footer.html',
    controller: function($scope, $element, $attrs){
      API.Footer().get(function(data){
        console.log(data);
        $scope.guide = data.guide || [];
        $scope.logisInst = data.logisInst || [];
      });
    }
  }
}]);


/**
 * app - 返回顶部
 *
 * @param  {type} 'toTop'       description
 * @param  {type} ['Move'       动画服务
 * @param  {type} function(Move description
 * @return {type}               description
 */
app.directive('toTop', ['Move', function(Move) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            angular.element(element).on('click', function() {
                var DOM = (document.body.scrollTop === 0) ? document.documentElement : document.body;
                Move.move(DOM, {
                    scrollTop: 0
                }, 500, 'easeOut');
            })
        }
    }
}]);


/**
 * app - 首页列表滑动
 *
 * @param  {type} 'listSlide'   description
 * @param  {type} ['Move'       动画服务
 * @param  {type} function(Move description
 * @return {type}               description
 */
app.directive('listSlide', ['Move', function(Move){
  return {
    restrict:'AE',
    link: function(scope, element){
      if(scope.$last == true){
        var parents = angular.element(element).parent();
        var parentHeight = parents[0].offsetHeight;
        var childs = parents.children();
        var length = childs.length;
        var iNow = 0;
        var timer = null;
        childs[0].style.top = "0";

        function slide(){
          timer = setInterval(function(){
            var currentChild = childs[iNow];
            Move.move(currentChild, { top: -parentHeight}, 700, 'easeIn', function(){
              currentChild.style.top = parentHeight + 'px';
            });
            iNow++;
            if(iNow >= length){
              iNow = 0;
            }
            Move.move(childs[iNow], { top: 0},  700, 'easeIn', function(){})
          }, 5000);
        }
        slide();

        parents.on('mouseenter', function(){
          clearInterval(timer);
        });

        parents.on('mouseleave', function(){
          slide();
        })


      }
    }
  }
}]);


/**
 * app - 搜索条件
 *
 * @param  {type} 'selectFilter'    description
 * @param  {type} ['$timeout'       description
 * @param  {type} function($timeout description
 * @return {type}                   description
 */
app.directive('selectFilter', ['$timeout', function($timeout) {
  var template = '<div class="select-filte">\
                  <div class="title">{{title}}</div>\
                  <div class="item-wrap">\
                    <a href="#" \
                       ng-class="{\'active\': model === item.value}"\
                       ng-click="select($event, item)"\
                       ng-repeat="item in options">{{item.name}}\
                    </a>\
                  </div>\
                </div>';
    return {
      restrict: 'AE',
      scope: {
        title:'@',
        model: '=',
        options:'=',
        onSelect: '&'
      },
      template: template,
      controller: function($scope) {
        $scope.select = function($event, item) {
          $event.preventDefault();
          $scope.model = item.value;
          $timeout(function(){
            $scope.onSelect({list: item})
          }, 0);
        };
      }
    }
}]);


/**
 * app - 显示详细
 *
 * @param  {type} 'trShowDetail' description
 * @param  {type} [function(     description
 * @return {type}                description
 */
app.directive('trShowDetail', [function(){
  return{
    restrict: 'AE',
    scope:{
      item:'='
    },
    link: function(scope, element, attrs){
      var ngElement = angular.element(element);
      var item = scope.item;
      ngElement.on('click', function(ev){
        ev.stopPropagation();
        var target = angular.element(ev.target || ev.srcElement);
        if(target.hasClass('toggle')){
          // 如果是展开的
          if(target.hasClass('toggleClose')){
            angular.element(element[0].querySelector('.item-detail')).remove();
          }else{
            ngElement.append('<div class="item-detail">\
                  <i class="remark-title">备注：</i>\
                  '+item.remark+'\
                </div>');
          }
          target.toggleClass('toggleClose');
        }
      });
    }
  }
}])



/**
 * app - 面包屑
 *
 * @param  {type} 'crumbs'        description
 * @param  {type} ['$state'       description
 * @param  {type} '$document'     description
 * @param  {type} function($state description
 * @param  {type} $document       description
 * @return {type}                 description
 */
app.directive('crumbs', ['$state', '$document', function($state, $document) {
    var template = '<div class="layout ">\
    <div class="crumbs">\
      <span class="crumbs-item">聚运通栏目列表</span>\
      <span class="crumbs-item-current">\
        <a ng-click="toggleShow($event)" href="#" class="current-page">{{current.title}}</a>\
        <nav class="subNav" ng-show="checked">\
        <ul>\
            <li class="icon-index"><a href="#">聚运通首页</a></li>\
            <li class="icon-order"><a href="#">我要下单</a></li>\
            <li class="icon-freight"><a ui-sref="specials">运费特惠</a></li>\
            <li class="icon-advice"><a href="#">仓储特惠</a></li>\
            <li class="icon-logis"><a href="#">物流跟踪</a></li>\
            <li class="icon-service"><a href="#">服务中心</a></li>\
        </ul>\
        </nav>\
      </span>\
    </div>\
  </div>';
    return {
        restrict: 'AE',
        template: template,
        scope: {},
        controller: function($scope, $element) {
            console.log($document)
            $scope.checked = false;
            $scope.current = $state.current;
            $document.on('click', function() {
                $scope.$apply(function() {
                    $scope.checked = false;
                })
            })
            $scope.toggleShow = function($event) {
                $event.stopPropagation();
                $event.preventDefault();
                $scope.checked = !$scope.checked;
            }
        }
    };
}]);



/**
 * app - 倒计时
 *
 * @param  {type} 'countdown '      description
 * @param  {type} ['$timeout'       description
 * @param  {type} function($timeout description
 * @return {type}                   description
 */
app.directive('countdown', ['$timeout', function($timeout){
  return {
    restrict:'AE',
    scope:{
      item:'=',
      endTm:'@'
    },
    link: function (scope, element, attrs){
      scope.endTm = "2016/08/02 15:58:00";
      var timeStampEnd = new Date(scope.endTm).getTime();
      var timer = null;
      function cacl(){
        var t = timeStampEnd - new Date().getTime();
        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);

        if(t<=0){
          item.over = true;
          timer.cancel();
        }else{
          angular.element(element).text(d+'天'+(h>9?h:'0'+h)+'时'+(m>9?m:'0'+m)+'分'+(s>9?s:'0'+s)+'秒');
          timer = $timeout(cacl,1000);
        }
      }

      cacl();
    }
  }
}]);


/**
 * app - 省市区及港口
 *
 * @param  {type} 'jmAddr'        description
 * @param  {type} ['Public'       description
 * @param  {type} function(Public description
 * @return {type}                 description
 */
app.directive('jmAddr', [
  'Public',
  '$compile',
  '$filter',
  '$timeout',
  function(Public, $compile, $filter, $timeout){
    return {
      restrict:'AE',
      require:'ngModel',
      scope:{
        // 头部显示数据
        headers:'=',

        // 列表数据
				data:'=',

        // input显示的值
				viewValue:'='
      },
      controller: function($scope, $element, $attrs){
        $scope.levels = [{ name: $scope.headers[0].en, items: $scope.data[0] }];
				$scope.timer = null;

        // 获取显示的值
				$scope.getViewValue = function(){
					var value = '';
					angular.forEach($scope.headers, function(item){
						value += ' '+ item.name;
					});
					$scope.viewValue = value;
				};

				$scope.$on('$destroy', function(){
					console.log('destroy')
				});

        // 选择头部的省市区层级
				$scope.selectLevel = function(level){
					$timeout.cancel($scope.timer);

          // if(level === 0){
          //   $scope.levels[level] = next;
          // }

					var prev = $scope.headers[level-1];
					var next = $scope.levels[level];
					var items = [];
					$scope.level = level;

          // 判断点击的是第一级以上 并且上一级有选择
					if(level > 0 && !prev.value){
						return ;
					}

          // 上一级有选择
          if(prev.value){
            items = $filter('filter')($scope.data[level], {pid:prev.value},true);
						if(angular.isObject(next)){
							next.items = items
						}else{
							next = { name: $scope.headers[level].en, items: items}
						}
						$scope.levels[level] = next;
          }
					$scope.getViewValue()
				};

        // 选择最后一级的时候
				$scope.selectCity = function(index, level, city){
					$timeout.cancel($scope.timer);
					$scope.headers[index].value = city.Id;
					$scope.headers[index].name = city.name;
					$scope.level = index+1;

					var prev  = city;
					var next = $scope.levels[index+1];
					var items = [];

					for(var i = index+1, length = $scope.headers.length; i < length; i++){
						$scope.headers[i].name = "";
						$scope.headers[i].value = "";
					}

					$scope.getViewValue();

          // 判断当前点击的是不是最后一级
					if(index < $scope.headers.length - 1){
						items = $filter('filter')($scope.data[index+1], {pid:prev.Id},true);
						if(angular.isObject(next)){
							next.items = items
						}else{
							next = { name: $scope.headers[index].en, items: items}
						}
						$scope.levels[index+1] = next;
						$scope.levels.length = index + 2;
					}else{
						$scope.close();
					}
				};
      },
      link: function(scope, element, attrs, c){
        scope.level = 0;
        var cloneScope = null;
				var headerHtml = "\
          <div class='addr-box'>\
            <div class='addr-header'>\
              <ul>\
                <li ng-click='selectLevel($index)' ng-class='{active: level === $index}' ng-repeat='h in headers'>{{h.title}} </li>\
              </ul>\
            </div>\
            <div class='addr-cont'>\
              <ul>\
                <li ng-init='index = $index' ng-repeat='le in levels' ng-show='$index === level' ng-switch='headers[$index].showType'>\
                  <div ng-switch-when='key'>\
                   <dl class='abbr clearfix' ng-repeat='(key, value) in le.items'><dt>{{key}}</dt><dd ng-class='{active: headers[index].value === city.Id}' ng-click='selectCity(index, le, city)' ng-repeat='city in value'>{{city.name}}</dd></dl>\
                  </div>\
                  <ul ng-switch-default>\
                    <li ng-class='{active: headers[index].value === city.Id}' ng-repeat='city in le.items' ng-click='selectCity(index, le, city)'>{{city.name}}</li>\
                  </ul>\
                </li>\
              </ul>\
            </div>\
          </div>";


        scope.close = function(level){
          if(scope.headerDom){
            scope.headerDom.remove();
            cloneScope.$destroy();
          }
        };

        //渲染数据
				scope.render =function(ev){
					scope.level = 0;
          cloneScope = scope.$new();
					scope.headerDom = $compile(headerHtml)(cloneScope);
          scope.headerDom.css({
            top: element[0].offsetTop + 'px',
            left: element[0].offsetLeft + 'px'
          })
					angular.element(document.body).append(scope.headerDom);
					scope.$apply();
				}
        // 省市区div
				scope.headerDom = null;
				angular.element(element).on('focus', function(ev){
          scope.close();
					scope.render();
				});
				angular.element(element).on('blur', function(){
					scope.timer = $timeout(function() {
            scope.close();
					}, 100);
				});
      }
    }
}]);
