var address = require('address');
var app = angular.module('app', ['ui.router', 'ngResource', 'ngAnimate', 'pasvaz.bindonce', 'ui.bootstrap', 'jmui', 'afkl.lazyImage']);

// 路由配置
var router = [
  ["home", require("./page/home/home.router.js")],
  ["notFound", require("./page/error/404.router.js")],
  ["about", require("./page/about/about.router.js")],
  ["help", require("./page/help/help.router.js")],

  // components
  ["components", require("./page/components/components.router.js")],
  ["components.chart", require("./page/components/chart/chart.router.js")],

  ["components.ueditor", require("./page/components/ueditor/ueditor.router.js")],
  ["components.news", require("./page/components/news/news.router.js")],
  ["components.news.list", require("./page/components/news/news.list.router.js")],
  ["components.news.detail", require("./page/components/news/news.detail.router.js")],
  ["components.news.save", require("./page/components/news/news.save.router.js")],
  ["components.scroll", require("./page/components/scroll/scroll.router.js")],
  ["components.search", require("./page/components/search/search.router.js")],

  ["components.tab", require("./page/components/tab/tab.router.js")],
  ["components.pagintion", require("./page/components/pagintion/pagintion.router.js")],
  ["components.accordion", require("./page/components/accordion/accordion.router.js")],
  ["components.dialog", require("./page/components/dialog/dialog.router.js")],
  ["components.lazyimg", require("./page/components/lazyimg/lazyimg.router.js")],
  ["components.imgerror", require("./page/components/imgError/imgerror.router.js")],

  ["components.switch", require("./page/components/switch/switch.router.js")],
  ["components.rate", require("./page/components/rate/rate.router.js")],
  ["components.alert", require("./page/components/alert/alert.router.js")],
  ["components.crumb", require("./page/components/crumb/crumb.router.js")],
  ["components.anchor", require("./page/components/anchor/anchor.router.js")],
  ["components.tooltip", require("./page/components/tooltip/tooltip.router.js")],

  ["components.checkbox", require("./page/components/checkbox/checkbox.router.js")],
  ["components.autoComponent", require("./page/components/autocomponent/autocomponent.router.js")],
  ["components.transfer", require("./page/components/transfer/transfer.router.js")],
  ["components.upload", require("./page/components/upload/upload.router.js")]
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
app.config(function ($provide, $controllerProvider, $httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
  // 将 controllerProvider 挂载到app 上
  app.registerController = $controllerProvider.register;

  console.log($provide)
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
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/404');

  $urlRouterProvider.when('/components', '/chart');

  // 配置路由
  router.forEach(function (item) {
    $stateProvider.state.apply($stateProvider, item);
  });
});


app.run(function ($rootScope, $log, $state, Util, Login, Api, Auth) {
  $rootScope.show = false;
  $rootScope.$state = $state;
  // 路由切换成功
  // , toParams, formState, formParams, options
  $rootScope.$on('$stateChangeSuccess', function () {
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
    Util.clearAll();
  });

  $rootScope.$on('$viewContentLoaded', function () {
    if ($rootScope.isFirstLoad) {
      $rootScope.isFirstLoad = false;
    } else {
      $rootScope.isShowFooter = true;
    }
  });
});

module.exports = app;