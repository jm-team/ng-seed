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
                clearTimeout(timer);
                if (fixedElement.hasClass('sub-nav-wrap') && document.documentElement.offsetWidth <= 1366) {
                    fixedElement.removeClass(scope.fixclass || 'fix');
                    return;
                }

                if (angular.isUndefined(startOffsetTop) || typeof scope.start !== 'undefined') {

                    // bug  -> 周浪
                    startElement = document.querySelector('.headFixed');
                    startElement = startElement || document.querySelector(scope.start);
                    startOffsetTop = startElement && (getOffset(startElement).top + startElement.offsetHeight);
                }

                if (startOffsetTop) {
                    timer = setTimeout(watchScroll, 30);
                    prv = scope.start;
                }
            });
        }
    }
}]);


/**
 * picSlider - Q&A图片轮播插件
 *
 * @param  {Array}  pics  - 图片数据数组,形式：[{bigUrl:'xx.pic', smallUrl:'xx.pic', title:'title'}]
 * @param  {type}
 * @return {type}
 */
app.directive('picSlider', ['Move', '$filter', function(Move, $filter) {
    return {
        restrict: 'AE',
        template: '<div class="picslider">\
                  <div class="picbox-wrap">\
                      <a href="" target="_blank" title="点击查看原图"><img src=""></a>\
                  </div>\
                  <div class="pic-nav">\
                      <span class="prev disabled"></span>\
                      <span class="next disabled"></span>\
                      <div class="piclist-wrap">\
                          <ul style="left:0">\
                              <li ng-repeat="pic in pics track by $index" ng-class="{\'sel\':$first}"><span class="after"></span><span class="before"></span><a href="javascript:;" ng-click="changePic(pic.bigurl,$event)"><img ng-src="{{pic.url | cdn}}"></a><span>{{pic.title}}</span></li>\
                          </ul>\
                      </div>\
                  </div>\
              </div>',
        scope: {
            pics: '='
        },
        link: function(scope, element, attrs) {
            var ele = element[0],
                _$ = angular.element,
                bigPic = ele.querySelector('img'),
                prevBtn = ele.querySelector('.prev'),
                nextBtn = ele.querySelector('.next'),
                picList = ele.querySelector('.piclist-wrap ul'),
                picNum = scope.pics.length,
                pageSize = Math.ceil(picNum / 5),
                pageWidth = 120 * 5,
                inScroll = false, //是否在翻页中
                curPage = 1;

            // 设置翻页按钮状态
            function setPageNav() {
                _$(prevBtn).removeClass('disabled');
                _$(nextBtn).removeClass('disabled');
                if (curPage == pageSize) {
                    _$(nextBtn).addClass('disabled');
                }
                if (curPage == 1) {
                    _$(prevBtn).addClass('disabled');
                }
            }

            // 初始化状态
            bigPic.src = $filter('cdn')([scope.pics[0].bigurl]);
            _$(bigPic).parent().attr('href', bigPic.src);
            _$(picList).css('width', 120 * picNum + 'px');
            _$(prevBtn).addClass('disabled');
            if (picNum > 5) {
                _$(nextBtn).removeClass('disabled');
            }
            scope.changePic = function(url, $event) {
                if (!_$($event.target).parent().parent().hasClass('sel')) {
                    //bigPic.src = url;
                    bigPic.src = $filter('cdn')([url]);
                    _$(bigPic).parent().attr('href', bigPic.src);
                    _$(picList).find('li').removeClass('sel');
                    _$($event.target).parent().parent().addClass('sel');
                }
            };
            _$(prevBtn).on('click', function() {
                if (_$(this).hasClass('disabled')) {
                    return
                }
                if (curPage > 1 && !inScroll) {
                    inScroll = true;
                    var oldLeft = parseInt(_$(picList).css('left'));
                    Move.move(picList, {
                        left: oldLeft + pageWidth
                    }, 500, 'easeOut', function() {
                        inScroll = false;
                    });
                    curPage--;
                    setPageNav();
                }
            });
            _$(nextBtn).on('click', function() {
                if (_$(this).hasClass('disabled')) {
                    return
                }
                if ((curPage < pageSize) && !inScroll) {
                    inScroll = true;
                    var oldLeft = parseInt(_$(picList).css('left'));
                    Move.move(picList, {
                        left: oldLeft - pageWidth
                    }, 500, 'easeOut', function() {
                        inScroll = false;
                    });
                    curPage++;
                    setPageNav();
                }
            });
        }
    }
}]);

app.directive('jmAccordion', ['API',
    function(API) {
        return {
            restrict: 'AE',
            template: '<button class="jm-accordion">{{item.title}}</button>' + '<div class="jm-panel">' + '<p>{{item.content}}</p>' + '</div>',
            scope: {
                item: '=',
                isOpen: '=?'
            },
            link: function(scope, element, attrs) {
                var _$ = angular.element;
                _$(element).on('click', function(event) {
                    var target = _$(event.target);
                    // header
                    if (target.hasClass('jm-accordion')) {
                        closeOthers(target)
                        toggleMe(target);
                    }
                })

                scope.$watch('isOpen', function(value) {
                    if (value) {
                        var _btn = _$(element).find('button');
                        closeOthers(_btn);
                        toggleMe(_btn);
                    }
                });

                function toggleMe(ele) {
                    var btn = ele;
                    btn.toggleClass("active");
                    btn.next().toggleClass("show");
                }

                function closeOthers(ele) {
                    var btns = _$(ele).parent().parent().children().find('button');
                    angular.forEach(btns, function(btn) {
                        var _btn = _$(btn);
                        if (_btn !== ele) {
                            _btn.removeClass('active')
                            _btn.next().removeClass('show');
                        }
                    });
                }
            }
        }
    }
]);


/**
 * app - 公共头部
 *
 * @param  {type} 'jytTobar' description
 * @param  {type} [function( description
 * @return {type}            description
 */
app.directive('jmTopbar', ['API', 'Session', 'Cookie', '$rootScope', 'Auth', '$location', 'Address', 'SERVER_ADDRESS', 'CENTER_ADDRESS',
    function(API, Session, Cookie, $rootScope, Auth, $location, Address, SERVER_ADDRESS, CENTER_ADDRESS) {
        return {
            restrict: 'AE',
            templateUrl: '/dist/page/header.html',
            controller: ['$scope', function($scope) {

                var shiroJID = Cookie.getCookie('shiroJID');
                $scope.localAdress = Address.getLocalAddress();
                $scope.ServerAddr = SERVER_ADDRESS;
                $scope.menuId = '';
                $scope.centerAddrs = CENTER_ADDRESS;

                // 如果没有shiroJID 就是没有登录
                if (!shiroJID) {
                    $scope.isShow = true;
                }

                // 监听登录成功
                $scope.$on('userLoginSuccess', function($event, data) {
                    $scope.User = data;

                    // 如果为0,则设置为4
                    if (data.userType == 0) {
                        data.userType = 4;
                    }

                    $scope.menuId = ({ "3": "19", "4": "29" })[data.userType];
                    $scope.isShow = true;
                });

                // 页面状态跳转成功 重新获取服务器地址和本地地址方便后端重定向到具体页面
                $scope.$on('$stateChangeSuccess', function() {
                    $scope.localAdress = Address.getLocalAddress();
                });

                // 监听退出成功  如请求接口出现401
                $scope.$on('userLogoutSuccess', function() {
                    $scope.User = Auth.getUser();
                    $scope.isShow = true;
                });

                $scope.login = function() {
                    Address.localAddress = $location.absUrl();
                    $scope.localAdress = Address.localAddress;
                }

                // 退出
                $scope.logout = function($event) {
                    // 用户退出成功 删除cookie
                    // 删除Session的shiroJID  token
                    // 删除用户信息
                    Cookie.delCookie('shiroJID');
                    Session.shiroJID = '';
                    Session.removeToken();
                    Auth.removeUser();
                    $rootScope.$emit('userLogoutSuccess');

                    location.href = SERVER_ADDRESS + '/webapi/v1/logout?successful=' + $scope.localAdress;
                    $event.preventDefault();
                }
            }]
        }
    }
]);


/**
 * app - 公共尾部
 *
 * @param  {type} 'jytFooter'  description
 * @param  {type} ['API'       description
 * @param  {type} function(API description
 * @return {type}              description
 */
app.directive('jmFooter', ['API', function(API) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/dist/page/footer.html',
        controller: ['$scope', function($scope) {
            var footerData = require('json!../../mocks/footer.json');
            $scope.guide = footerData.guide || [];
            $scope.logisInst = footerData.logisInst || [];




            // API.Footer().get(function (data) {
            //     $scope.guide = data.guide || [];
            //     $scope.logisInst = data.logisInst || [];
            // });
        }]
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
app.directive('toTop', ['Move', '$window', function(Move, $window) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var timer = null;
            angular.element(element).on('click', function() {
                var DOM = (document.body.scrollTop === 0) ? document.documentElement : document.body;
                Move.move(DOM, {
                    scrollTop: 0
                }, 500, 'easeOut');
            });

            angular.element($window).on('scroll', function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop <= 50) {
                        element.css({
                            display: 'none'
                        });
                    } else {
                        element.css({
                            display: 'block'
                        });
                    }
                }, 80);

            });
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
app.directive('listSlide', ['Move', function(Move) {
    return {
        restrict: 'AE',
        link: function(scope, element) {
            if (scope.$last == true) {
                var parents = angular.element(element).parent();
                var parentHeight = parents[0].offsetHeight;
                var childs = parents.children();
                var length = childs.length;
                var iNow = 0;
                var timer = null;
                childs[0].style.top = "0";

                function slide() {
                    timer = setInterval(function() {
                        var currentChild = childs[iNow];
                        Move.move(currentChild, { top: -parentHeight }, 700, 'easeIn', function() {
                            currentChild.style.top = parentHeight + 'px';
                        });
                        iNow++;
                        if (iNow >= length) {
                            iNow = 0;
                        }
                        Move.move(childs[iNow], { top: 0 }, 700, 'easeIn', function() {})
                    }, 5000);
                }

                slide();

                parents.on('mouseenter', function() {
                    clearInterval(timer);
                });

                parents.on('mouseleave', function() {
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
                       ng-class="{\'active\': model == item.optionCode}"\
                       ng-click="select($event, item)"\
                       ng-repeat="item in options" show-select-filter showmore="showMore()" >{{item.optionName}}\
                    </a> <span class="more hide" ng-click="onShowMore()">更多 </span>\
                  </div>\
                </div>';
    return {
        restrict: 'AE',
        scope: {
            more: '=',
            title: '@',
            model: '=',
            options: '=',
            onSelect: '&'
        },
        template: template,
        controller: ['$scope', function($scope) {
            $scope.select = function($event, item) {
                $event.preventDefault();
                $scope.model = item.optionCode;

                $timeout(function() {
                    $scope.onSelect({ list: item })
                }, 0);
            };
        }],
        link: function(scope, element, attrs) {
            scope.showMore = function() {
                angular.element(element).find('span').removeClass('hide')
            };

            // scope.$watch('model', function(newVal, oldVal){
            //     if(newVal){

            //     }
            // });

            scope.onShowMore = function() {
                angular.element(element).toggleClass('open');
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
app.directive('trShowDetail', [function() {
    return {
        restrict: 'AE',
        scope: {
            item: '='
        },
        link: function(scope, element, attrs) {
            var ngElement = angular.element(element);
            var item = scope.item;
            ngElement.on('click', function(ev) {
                ev.stopPropagation();
                var target = angular.element(ev.target || ev.srcElement);
                if (target.hasClass('toggle')) {
                    ev.preventDefault();
                    // 如果是展开的
                    if (target.hasClass('toggleClose')) {
                        angular.element(element[0].querySelector('.item-detail')).remove();
                    } else {
                        ngElement.append('<div class="item-detail">\
                  <i class="remark-title">备注：</i>\
                  ' + item.remark + '\
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
    <div class="crumbs clearfix">\
      <a class="crumbs-item pull-left" ui-sref="home">聚运通首页</a>\
      <span class="crumbs-item-current pull-left" ng-class="{\'crumbs-item\': level.length > 0}">\
        <a ng-click="toggleShow($event)" href="#" class="current-page">{{current.title}}</a>\
        <nav class="subNav" ng-show="checked">\
        <ul>\
            <li class="icon-index"><a ui-sref="home">聚运通首页</a></li>\
            <li class="icon-order"><a ui-sref="orders">我要下单</a></li>\
            <li class="icon-freight"><a ui-sref="specials">运费特惠</a></li>\
            <li class="icon-advice"><a href="stroage">仓储特惠</a></li>\
            <li class="icon-logis"><a href="track">物流跟踪</a></li>\
            <li class="icon-service"><a href="service">服务中心</a></li>\
        </ul>\
        </nav>\
      </span><div ng-if="level.length > 0" class="crumbs-2 pull-left "><a class="crumbs-item" ng-class="{\'last\': $last}" ui-sref="{{l.url}}" ng-repeat="l in level"> <i>{{ l.title }}</i></a> </div>\
    </div>\
  </div>';
    return {
        restrict: 'AE',
        template: template,
        scope: {
            level: '='
        },
        controller: ['$scope', function($scope) {
            $scope.checked = false;
            $scope.current = $state.current;
            $document.on('click', function() {
                $scope.$apply(function() {
                    $scope.checked = false;
                });
            });

            $scope.toggleShow = function($event) {
                $event.stopPropagation();
                $event.preventDefault();
                $scope.checked = !$scope.checked;
            };
        }]
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
app.directive('countdown', ['$timeout', function($timeout) {
    return {
        restrict: 'AE',
        scope: {
            item: '=',
            endTm: '@'
        },
        link: function(scope, element, attrs) {
            var timeStampEnd;
            var timer = null;

            // 时间戳
            if (Number(scope.endTm)) {
                timeStampEnd = Number(scope.endTm);
            } else {
                timeStampEnd = new Date(scope.endTm).getTime();
            }

            function cacl() {
                var t = timeStampEnd - new Date().getTime();
                var d = Math.floor(t / 1000 / 60 / 60 / 24);
                var h = Math.floor(t / 1000 / 60 / 60 % 24);
                var m = Math.floor(t / 1000 / 60 % 60);
                var s = Math.floor(t / 1000 % 60);

                //
                if (t <= 0) {
                    scope.item.over = true;
                    angular.element(element).text('报价中');
                    $timeout.cancel(timer)
                } else if (angular.isUndefined(t)) {
                    angular.element(element).text('');
                    $timeout.cancel(timer)
                } else {
                    angular.element(element).text(d + '天' + (h > 9 ? h : '0' + h) + '时' + (m > 9 ? m : '0' + m) + '分' + (s > 9 ? s : '0' + s) + '秒');
                    timer = $timeout(cacl, 1000);
                }
            }

            cacl();
        }
    }
}]);


app.directive('mouseoutDelayed', ['Util', '$timeout', function(Util, $timeout) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var timer = null;
            var timer2 = null;
            var secondNav = angular.element(Util.getByClassName(attrs.target));
            element.on('mouseover', function() {
                $timeout.cancel(timer2)
                $timeout.cancel(timer)
                secondNav.css('display', 'block');
                element.addClass('active')
            });

            element.on('mouseout', function() {
                timer = $timeout(function() {
                    secondNav.css('display', 'none');
                    element.removeClass('active')
                }, 120)
            });

            secondNav.on('mouseover', function() {
                $timeout.cancel(timer)
            });

            secondNav.on('mouseout', function() {
                timer2 = $timeout(function() {
                    element.removeClass('active')
                    secondNav.css('display', 'none');
                }, 100)
            });
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
    '$q',
    'Public',
    'API',
    '$compile',
    '$filter',
    '$timeout',
    'Area',
    'Util',
    function($q, Public, API, $compile, $filter, $timeout, Area, Util) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                // 头部显示数据
                headers: '=',

                // 获取类型 省市区还是港口
                genre: '=',

                // 列表数据
                data: '=',

                // 最后一级ID
                lastId: '='
            },
            link: function(scope, element, attrs, ngModel) {

                scope.level = 0;
                scope.getCityType = 1;
                scope.iNow = 0;
                scope.searchResult = [];
                scope.pageSize = 5;
                scope.currentPage = 0;
                scope.searchLists = [];

                var searchData = '';
                var cloneScope = null;
                var headerHtml = "\
                      <div class='addr-box' ng-show='getCityType==1 || (searchResult.length > 0 && getCityType==2)'>\
                        <div class='addr-header' ng-if='getCityType==1'>\
                          <ul>\
                            <li ng-click='selectLevel($index)' ng-class='{active: level === $index}' ng-repeat='h in headers'>{{h.title}} </li>\
                          </ul>\
                          <span class='jm-close' ng-click='close()'>&times;</span>\
                          <button type='button' class='jm-btn m-l-15' ng-click='clear()'>清除</button>\
                        </div>\
                        <div class='addr-cont' ng-if='getCityType==1'>\
                          <ul>\
                            <li ng-init='index = $index' ng-repeat='le in levels' ng-show='$index === level' ng-switch='headers[$index].showType'>\
                              <div ng-switch-when='key'>\
                               <dl class='abbr clearfix' ng-repeat='(key, value) in le.items'><dt>{{key}}</dt><dd ng-class='{active: models[index].id === city.id}' ng-click='selectCity(index, le, city)' ng-repeat='city in value'>{{city.text}}</dd></dl>\
                              </div>\
                              <ul ng-switch-default>\
                                <li ng-class='{active: models[index].id === city.id}' ng-repeat='city in le.items' ng-click='selectCity(index, le, city)'>{{city.text}}</li>\
                              </ul>\
                            </li>\
                          </ul>\
                        </div>\
                        <!-- 输入下拉提示 -->\
                        <div  ng-if='searchResult.length > 0 && getCityType==2'>\
                            <ul class='searchWrap'>\
                                <li ng-class='{active: iNow==$index}' ng-click='selectSearch(list, $index)' ng-repeat='list in searchLists'>\
                                    <h3>{{ list.city }}</h3>\
                                    <p>{{list.provice}}</p>\
                                </li></ul>\
                            <ol class='pages' ng-if='arrayTotalPage.length>1'>\
                                <li ng-class='{active: $index == currentPage}' ng-click='getDataByPage($event, $index)' ng-repeat='item in arrayTotalPage track by $index'>{{$index+1}}</li>\
                            </ol></div>\
                      </div>";


                // 定时器
                var timer = null;
                var isVaild = angular.isUndefined(attrs.jmValidAddr) ? false : true;
                // 上一次搜索的关键
                var prevSearchTxt = '';


                // 手动输入
                element.on('keyup', function($event) {
                    var timer2 = null;
                    var value = element[0].value;
                    var keyCode = $event.keyCode;
                    var h = [];

                    // 没有输入值 显示点击选择的样式
                    if (!value || angular.isArray(value)) {
                        scope.getCityType = 1;
                        scope.searchLists = [];
                        scope.searchResult = [];
                        prevSearchTxt = value;
                        scope.$apply()
                        return;
                    }
                    scope.getCityType = 2;
                    switch (keyCode) {
                        // 上
                        case 38:

                            if (scope.iNow === 0) {
                                scope.iNow = scope.searchLists.length - 1;
                            } else {
                                scope.iNow--;
                            }

                            break;

                            // 下
                        case 40:
                            if (scope.iNow === scope.searchLists.length - 1) {
                                scope.iNow = 0;
                            } else {
                                scope.iNow++;
                            }
                            break;

                            // 左
                        case 37:
                            event.preventDefault();
                            scope.$apply(function() {
                                if (scope.currentPage != 0) {
                                    scope.currentPage--;
                                }
                                scope.getDataByPage($event, scope.currentPage);
                            });

                            break;

                            // 右
                        case 39:
                            event.preventDefault();
                            scope.$apply(function() {
                                if (scope.currentPage < scope.totalPage - 1) {
                                    scope.currentPage++;
                                }
                                scope.getDataByPage($event, scope.currentPage);
                            })
                            break;

                        case 13:
                            scope.selectSearch(scope.searchLists[scope.iNow]);
                            element[0].blur();
                            return;
                            break;
                    }
                    scope.$apply()
                    if (prevSearchTxt === value) {
                        return;
                    }

                    scope.iNow = 0;
                    prevSearchTxt = value;
                    $timeout.cancel(timer2);
                    timer2 = $timeout(function() {
                        var arr = [];
                        h = [];
                        scope.searchResult = [];
                        scope.searchLists = [];
                        searchData.replace(RegExp("@([^\\|@]*\\|)?(" + value + ")[^@]*", "gi"),
                            function(a, b, c) {
                                h.push(a);
                                // return ""
                            })
                        scope.currentPage = 0;
                        for (var i = 0, length = h.length; i < length; i++) {
                            var itemArr = h[i].split(/@|\|/);
                            var json = {}
                            var itemModel = []
                            var text = '';
                            itemArr.reverse().pop();

                            for (var j = 0, length2 = itemArr.length; j < length2; j += 2) {
                                itemModel.push({
                                    id: itemArr[j],
                                    text: itemArr[j + 1]
                                })
                                text += itemArr[j + 1]
                            }

                            arr.push({
                                model: itemModel,
                                text: text,
                                provice: itemArr[1],
                                city: itemArr[itemArr.length - 1],
                                id: itemArr[itemArr.length - 2]
                            })

                        }
                        scope.searchResult = arr;
                        scope.searchLists = $filter('limitTo')(scope.searchResult, scope.pageSize, 0)
                        scope.totalPage = Math.ceil(arr.length / scope.pageSize)
                        scope.arrayTotalPage = new Array(scope.totalPage)
                    }, 100);
                })


                // 数据层级
                scope.levels = [];
                scope.models = angular.isArray(ngModel.$modelValue) ? ngModel.$modelValue : [];

                // 获取搜索字符串
                function getSearchStr() {
                    var code = 231;

                    if (scope.genre == 'Innerport') {
                        code = 233;
                    } else if (scope.genre == 'Port') {
                        code = 234;
                    }
                    API.QueryAddrSearch(code).then(function(data) {
                        searchData = data
                    });
                }

                // 获取数据
                function getData(pid) {

                    var defer = $q.defer();
                    var data = Area[scope.genre + 'Data'][pid];

                    if (angular.isArray(data) && data.length > 0) {
                        // 存储在本地
                        return $q.when(data);
                    } else {
                        if (scope.genre === 'Innerport') {
                            API.Innerport().get({ parentCode: pid }, function(data) {
                                var result = data.data;
                                // 存储在service中
                                Area['InnerportData'][pid] = result;
                                defer.resolve(result);
                            });

                            // 海运
                        } else if (scope.genre === 'Port') {
                            API.Port().get({ parentCode: pid }, function(data) {
                                var result = data.data;
                                // 存储在service中
                                Area['PortData'][pid] = result;
                                defer.resolve(result);
                            });
                        } else {
                            API.Area().get({ parentCode: pid }, function(data) {
                                var result = data.data;
                                // 存储在service中
                                Area['AreaData'][pid] = result;
                                defer.resolve(result);
                            });
                        }
                    }
                    return defer.promise;
                }

                // 获取元素距离doc的left 和 top
                function getOffset(el) {
                    var offset = { top: 0, left: 0 };
                    while (el) {
                        offset.top += el.offsetTop;
                        offset.left += el.offsetLeft;
                        el = el.offsetParent;
                    }
                    return offset;
                }

                // 将要显示的值 转换
                function transformViewValus(modelValue) {
                    var value = '';
                    angular.forEach(modelValue, function(item) {
                        if(item.text){
                            value += ' ' + item.text;
                        }
                    });

                    angular.element(element).attr({
                        title: value
                    })
                    return value || '';
                }

                // 改变显示
                ngModel.$formatters.push(function(modelValue) {
                    return transformViewValus(modelValue);
                });


                ngModel.$parsers.unshift(function(value) {
                    scope.models = value || [];
                    ngModel.$viewValue = transformViewValus(value);
                    return value;
                });

                // 点击清除
                scope.clear = function() {
                    scope.models = [];
                    ngModel.$setViewValue(scope.models);
                    ngModel.$render();
                    scope.selectLevel(0);
                };


                // 点击搜索出来的
                scope.selectSearch = function(list, $index) {
                    prevSearchTxt = '';
                    scope.iNow = 0;
                    scope.models = list.model
                    scope.searchResult = [];
                    scope.searchLists = [];
                    ngModel.$setViewValue(scope.models);
                    ngModel.$render();
                };

                // 点击分页
                scope.getDataByPage = function($event, page) {
                    var arr = angular.copy(scope.searchResult);
                    $timeout.cancel(timer);
                    $event.stopPropagation();
                    scope.currentPage = page;
                    scope.searchLists = arr.splice(scope.pageSize * page, scope.pageSize)
                };

                // 选择头部的省市区层级
                scope.selectLevel = function(level) {
                    $timeout.cancel(timer);
                    var defer = $q.defer();

                    var prev = scope.models[level - 1] || {};
                    var next = scope.levels[level];


                    // 判断点击的是第一级以上 并且上一级有选择
                    if (level > 0 && !prev.id) {
                        return $q.when();
                    }
                    scope.level = level;
                    // 上一级有选择
                    if (prev.id) {
                        getData(prev.id).then(function(data) {

                            if (angular.isObject(next)) {
                                next.items = data
                            } else {
                                next = { name: scope.headers[level].en, items: data }
                            }
                            scope.matchCity(scope.lastId, data, level);
                            scope.levels[level] = next;
                            defer.resolve(data);
                        });

                    } else {
                        defer.resolve()
                    }

                    return defer.promise;
                };

                // 关闭弹出框
                scope.close = function() {
                    if (scope.headerDom) {
                        scope.headerDom.remove();
                        cloneScope.$destroy();
                    }
                };

                // 选择最后一级的时候
                scope.selectCity = function(index, level, city) {
                    $timeout.cancel(timer);
                    scope.level = index + 1;

                    var prev = city;
                    var next = scope.levels[index + 1];

                    // 判断当前点击的是不是最后一级
                    if (index < scope.headers.length - 1) {
                        //  items = $filter('filter')(scope.data[index+1], {pid:prev.id},true);
                        // 获取数据
                        getData(prev.id).then(function(data) {

                            // 判断下一级是否是一个对象
                            if (angular.isObject(next)) {
                                next.items = data;
                            } else {
                                next = { name: scope.headers[index].en, items: data };
                            }
                            scope.levels[index + 1] = next;
                            scope.levels.length = index + 2;
                        });

                    } else {
                        scope.close();
                    }

                    scope.models.length = index;
                    scope.models.push({ text: city.text, id: city.id });
                    ngModel.$setViewValue(scope.models);
                    ngModel.$render();
                };

                // 有传入ID
                scope.matchCity = function(lastId, data, level) {
                    // 判断传入是否有ID
                    if (lastId) {
                        var arrIds = [];
                        var sLastId = lastId.toString();
                        switch (scope.genre) {
                            // 内河航运
                            case "Innerport":
                                arrIds[0] = sLastId.substr(0, 2);
                                arrIds[1] = sLastId.substr(0, 4);
                                arrIds[2] = sLastId.substr(0);

                                break;

                                // 海运
                            case "Port":
                                arrIds[0] = sLastId.substr(0, 2);
                                arrIds[1] = sLastId.substr(0, 5);
                                arrIds[2] = sLastId.substr(0);
                                break;

                            default:
                                arrIds[0] = sLastId.substr(0, 5);
                                arrIds[1] = sLastId.substr(0, 7);
                                arrIds[2] = sLastId.substr(0);
                        }

                        for (var length = data.length; length--;) {
                            var item = data[length];
                            if (item.id === arrIds[level]) {
                                scope.models.length = level;
                                scope.models.push(item);
                                ngModel.$setViewValue(scope.models);
                                ngModel.$render();
                                break;
                            }
                        }

                    }
                };

                scope.initCity = function() {
                    getData().then(function(data) {
                        scope.matchCity(scope.lastId, data, 0);
                        scope.levels = [{ name: scope.headers[0].en, items: data }];
                    });

                    var watchFn = scope.$watch(function() {
                        return scope.models.length;
                    }, function(newVal) {
                        if (newVal) {
                            var last = scope.models[newVal - 1] || {};
                            if (!last.id) {
                                watchFn();
                                scope.models.pop();
                            } else if (isVaild && newVal === scope.headers.length) {
                                watchFn();
                            } else {
                                scope.selectLevel(scope.models.length);
                            }
                        }

                    });
                };


                //渲染
                scope.render = function() {
                    // 省市区div
                    scope.headerDom = null;
                    scope.level = 0;
                    cloneScope = scope.$new();
                    scope.headerDom = $compile(headerHtml)(cloneScope);
                    getData().then(function(data) {
                        // scope.matchCity(scope.lastId, data, 0);
                        scope.levels = [{ name: scope.headers[0].en, items: data }];
                    });

                    getSearchStr();

                    scope.headerDom.css({
                        top: (element[0].offsetTop + element[0].offsetHeight + 2) + 'px',
                        left: element[0].offsetLeft + 'px'
                    });
                    angular.element(element.parent()).append(scope.headerDom);
                    scope.$apply();


                    angular.element(scope.headerDom).on('click', function(ev) {
                        ev.stopPropagation();
                    })
                };

                // 如果有需要回填数据的  执行这个函数

                if (scope.lastId) {
                    scope.initCity();
                    angular.element(element).attr({
                        readOnly: true
                    });
                }

                element.on('focus', function(ev) {
                    ev.stopPropagation();
                    scope.getCityType = 1;
                    scope.close();
                    angular.element(Util.getByClassName('addr-box')).remove();
                    scope.render();
                });

                element.on('blur', function() {
                    if (!angular.isArray(scope.models) || scope.models.length === 0) {
                        scope.models = [];
                        ngModel.$setViewValue(scope.models);
                        ngModel.$render();
                    }
                    timer = $timeout(function() {
                        scope.close();
                    }, 300);
                    scope.$apply()
                });

                element.on('click', function(ev) {
                    ev.stopPropagation();
                });

                angular.element(document.body).on('click', function() {
                    scope.close();
                });
            }
        }
    }
]);

/**
 * app - 模拟下拉框选择
 *
 * @param  {type} 'jmSelect'        description
 * @param  {type} ['Public'       description
 * @param  {type} function(Public description
 * @return {type}                 description
 */
app.directive('jmSelect', ['$filter', '$timeout', function($filter, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div class="jm-input-group-btn"><button type="button"><span class="jv"></span><span class="caret"></span></button><ul class="jm-drop-menu"><li ng-class="{\'active\': model === li.optionCode}" ng-click="select(li)" ng-repeat="li in list">{{ li.optionName }}</li></ul></div>',
        scope: {
            list: '=',
            model: '@'
        },
        link: function(scope, element, attrs) {
            var $ele = angular.element(element);
            var $button = $ele.find('button');
            var $jv = angular.element($ele.find('span')[0]);
            $button.on('click', function() {
                angular.element(element).toggleClass('open');
            });

            var cancelFn = scope.$watch('list', function(val) {
                if (val && angular.isArray(val)) {
                    var li = $filter('filter')(scope.list, { optionCode: scope.model }, true)[0];
                    $jv.text(li.optionName);
                    cancelFn();
                }
            });


            scope.select = function(li) {
                scope.model = li.optionCode;
                $jv.text(li.optionName);
                $ele.removeClass('open');
            }
        }
    }
}]);

/**
 * jmValidAddr - 地址验证
 *
 * @param  {type}     description
 * @param  {type}     description
 * @param  {type} function( description
 * @return {type}                 description
 */
app.directive('jmValidAddr', [function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$setValidity('hasAddr', true);
            ctrl.$parsers.push(function(val) {
                var levels = attrs.levels;

                if (!angular.isArray(val)) {
                    ctrl.$setValidity('hasAddr', false);
                } else {
                    if (val.length < Number(levels)) {
                        ctrl.$setValidity('hasAddr', false);
                    } else {
                        ctrl.$setValidity('hasAddr', true);
                    }
                }

                return val;
            })
        }
    }
}]);

/**
 * app - 星星级别显示  TODO: 做选择星星级别交互
 *
 * @param  {type} 'jmStars'        description
 * @param  {type} ['Public'       description
 * @param  {type} function(Public description
 * @return {type}                 description
 */
app.directive('jmStars', ['$compile', function($compile) {
    return {
        restrict: 'AE',
        scope: {
            level: '@',
            totalLevel: '@'
        },
        link: function(scope, element, attrs) {
            function createStars() {
                var html = '<p>';
                for (var i = 1; i <= scope.totalLevel; i++) {
                    html += '<i ng-class="{active: ' + i + ' <= level}">' + i + '</i>';
                }
                return html + '</p>';
            }

            var ngEle = $compile(createStars())(scope);
            angular.element(element).append(ngEle);
        }
    }
}]);


/**
 * app - 聚贸QQ在线客服咨询
 *
 * @param  {type} 'jmQq'        description
 * @param  {type} ['Public'       description
 * @param  {type} function(Public description
 * @return {type}                 description
 */
app.directive('jmQq', ['Public', function(Public) {
    return {
        restrict: 'AE',
        scope: {
            uin: '@',
            service: '@',
            menu: '@',
            sigt: '@',
            sigu: '@'
        },
        link: function(scope, element, attrs) {
            var QQ = Public.QQ;
            var uin = scope.uin || QQ.uin;
            var service = scope.service || QQ.service;
            var menu = scope.menu || QQ.menu;
            var sigt = scope.sigt || QQ.sigt;
            var sigu = scope.sigu || QQ.sigu;

            angular.element(element).on('click', function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                window.location = "tencent://message/?uin=" + uin + "&Service=" + service + "&Menu=" + menu + '&SigT=' + sigt + '&SigU=' + sigu;
            });
        }
    }
}]);


/**
 * showSelectFilter - 显示隐藏更多过滤选项
 *
 * @param  {type}        description
 * @param  {type}        description
 * @param  {type} function( description
 * @return {type}                 description
 */
app.directive('showSelectFilter', ['$timeout', function($timeout) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            if (scope.$last) {

                $timeout(function() {
                    var parentHeight = element.parent()[0].offsetHeight;
                    if (parentHeight > 37) {
                        scope.$eval(attrs.showmore)
                    }
                }, 0)
            }
        }
    }
}]);

/**
 * imgError - 图片加载失败
 *
 * @param  {type}        description
 * @param  {type}        description
 * @param  {type} function( description
 * @return {type}                 description
 */


app.directive('imgError', ['$filter', '$timeout', function($filter, $timeout) {
    return {
        link: function(scope, element, attrs) {
            var imgSrc = attrs.imgError;
            var defaultImg = $filter('cdn')(imgSrc);
            var _ele = angular.element(element);

            if (defaultImg) {
                _ele.on('error', function() {
                    _ele.attr('src', defaultImg.$$unwrapTrustedValue());
                    _ele.off('error');
                });
            }

        }
    }
}]);


app.directive('validTmSection', ['$filter', function($filter) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$setValidity('validTm', true);
            var contrastTm = attrs.contrastTm;

            ctrl.$parsers.push(function(val) {
                var contrastTm = new Date(scope.$eval(attrs.contrastTm)).getTime();
                var selectTm = new Date(ctrl.$viewValue).getTime();
                if (selectTm > contrastTm) {
                    ctrl.$setValidity('validTm', false);
                } else {
                    ctrl.$setValidity('validTm', true);
                }

                return val;
            });
        }
    }
}]);

app.directive('loginForm', ['Util', 'API', 'Session', 'Cookie', 'Auth', '$rootScope',
    function(Util, API, Session, Cookie, Auth, $rootScope) {
    return {
        restrict: 'AE',
        scope:{
            onClose:'&',
            changeCode:'&',
            userInValid:'=',
            loging:'=',
            errTip:'='
        },
        link: function(scope, element, attrs) {
            var iframe = document.createElement('iframe');
            iframe.name = "loginFrame";
            iframe.id = "loginFrame";
            angular.element(document.body).append(iframe);

            iframe.onload = function() {
                try{
                    str = parent.document.getElementById("loginFrame").contentWindow.location.href;
                    str = str.substr(str.indexOf('?')+1);
                    shiroJID = Util.search(str, 'shiroJID');
                    if(shiroJID){
                        Session.shiroJID = shiroJID;
                        Cookie.setCookie('shiroJID', shiroJID);
                        scope.userInValid = false;
                        API.User().get({ t: +new Date() }, function(data) {
                            Auth.user = data;
                            $rootScope.$broadcast('userLoginSuccess', data);
                            angular.element(iframe).remove();
                            scope.loging = false;
                        });

                    }else{
                       scope.$apply(function(){
                            scope.errTip = true;
                            scope.loging = false; 
                            scope.userInValid = true;
                            // 重新获取验证码
                            scope.changeCode();
                        });
                    }
                } catch(e){
                    scope.$apply(function(){
                        scope.errTip = true;
                        scope.loging = false;   
                        // 重新获取验证码
                        scope.changeCode();
                        scope.userInValid = true; 
                    });
                    
                }
                
            };

            iframe.onerror = function(){
                scope.$apply(function(){
                    scope.errTip = true;
                    scope.loging = false;   
                    scope.userInValid = true; 
                    // 重新获取验证码
                    scope.changeCode();
                });
            }
            
        }
    }
}]);
