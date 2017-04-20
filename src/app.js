require('./service/ng.element');
var address = require('address');
var jmui = require('component/jmui');
var app = angular.module('app', ['ng.element', 'ui.router', 'ngResource', 'ngAnimate', 'pasvaz.bindonce', 'ui.bootstrap', 'jmui', 'afkl.lazyImage']);

// 路由配置
var router = [
  ["notFound", require("./page/error/404.js")],


  ["about", require("./page/about/about.js")],

  ["help", require("./page/help/help.js")],

  // ["home.index", require("./router/home/home")],
  ["home", require("./page/home/index.js")],
  ["home.chart", require("./page/chart/chart.js")],

  ["home.ueditor", require("./page/ueditor/ueditor.js")],
  ["home.news", require("./page/news/news.js")],
  ["home.news.list", require("./page/news/news.list.js")],
  ["home.news.detail", require("./page/news/news.detail.js")],
  ["home.news.save", require("./page/news/news.save.js")],
  ["home.scroll", require("./page/scroll/scroll.js")],
  ["home.search", require("./page/search/search.js")],

  ["home.tab", require("./page/tab/tab.js")],
  ["home.pagintion", require("./page/pagintion/pagintion.js")],
  ["home.accordion", require("./page/accordion/accordion.js")],
  ["home.dialog", require("./page/dialog/dialog.js")],
  ["home.lazyimg", require("./page/lazyimg/lazyimg.js")],
  ["home.imgerror", require("./page/imgError/imgError.js")],

  ["home.switch", require("./page/switch/switch.js")],
  ["home.rate", require("./page/rate/rate.js")],
  ["home.alert", require("./page/alert/alert.js")],
  ["home.crumb", require("./page/crumb/crumb.js")],
  ["home.anchor", require("./page/anchor/anchor.js")],
  ["home.tooltip", require("./page/tooltip/tooltip.js")]
];

// 鏈接mongo配置
app.constant('API_SERVER', 'https://api.mongolab.com/api/1/databases/ng-seed/collections');
app.constant('API_KEY', 'mcnzRO1RdVBHxWEOVbtiIxD04i8H0syJ');

// 服务地址配置
app.constant('SERVER_ADDRESS', address.SERVER_ADDRESS);
app.constant('CENTER_ADDRESS', address.CENTER_ADDRESS);
app.constant('USERCENTER_ADDRESS', address.USERCENTER_ADDRESS);
app.constant('CDN_ADDRESS', address.CDN_ADDRESS);
app.constant('IMG_ADDRESS', address.IMG_ADDRESS);

// ng配置
app.config(function ($controllerProvider, $httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
  // 将 controllerProvider 挂载到app 上
  app.registerController = $controllerProvider.register;
  // IE缓存
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }
  $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
  $httpProvider.defaults.headers.get['Expires'] = '0';

  // 优化路由地址，开启SEO
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.when('/', '/chart');
  $urlRouterProvider.otherwise('/404');

  // 配置路由
  router.forEach(function (item) {
    $stateProvider.state.apply($stateProvider, item);
  });
});


app.run(function ($rootScope, $log, $state, requestService, Login, Api, Auth) {
  $rootScope.show = false;
  $rootScope.$state = $state;
  // 路由切换成功
  // , toParams, formState, formParams, options
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    $log.log('app run $stateChangeSuccess');
    $rootScope.show = true;
    Login.checkHasLogin().then(function (data) {
      $log.log('checkAutoLogin', data);
      Api.User().get({
        t: +new Date()
      }, function (userData) {
        if (userData.id) {
          Auth.user = userData;
        } else {
          Auth.user = null;
        }
        $rootScope.$broadcast('userLoginFinished', userData);
      });

    }, function (data) {
      // not login yet
      Auth.user = null;
      $rootScope.$broadcast('userLoginFinished', null);
      $log.log('not login yet', data)
    });

  });
  $rootScope.isShowFooter = false;
  $rootScope.isFirstLoad = true;

  // 路由切换开始
  // event, toState, toParams, formState, formParams, options
  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.isShowFooter = false;
    // 取消上一个路由中还在请求的并且可以取消的XHR
    requestService.clearAll();
  });

  $rootScope.$on('$viewContentLoaded', function (event, toState) {
    if ($rootScope.isFirstLoad) {
      $rootScope.isFirstLoad = false;
    } else {
      $rootScope.isShowFooter = true;
    }
  });
});

module.exports = app;
