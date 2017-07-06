var address = require('address');

var marked = window.marked = require('marked')
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var hljs = window.hljs = require('highlight.js');


var app = angular.module('app', ['ui.router', 'ngResource', 'ngAnimate', 'afkl.lazyImage', 'pasvaz.bindonce', 'jmui']);

// 路由配置
var router = require('./app.router');

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
app.config(function($provide, $controllerProvider, $httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
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
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/404');

  $urlRouterProvider.when('/components', '/chart');

  // 配置路由
  router.forEach(function(item) {
    $stateProvider.state.apply($stateProvider, item);
  });

  $httpProvider.interceptors.push('httpInterceptor')
});


app.run(function($rootScope, $log, $state, $location, Util, Login, Api, Auth) {
  $rootScope.$state = $state;
  // 路由切换成功
  //event, toState, toParams, formState, formParams, options
  $rootScope.$on('$stateChangeSuccess', function() {
    // 百度统计pv量
    _hmt.push(['_trackPageview', $location.path()]);

    $log.log('app run $stateChangeSuccess');
    Login.checkHasLogin({_t: new Date().getTime()}).then(function(data) {

      Api.User().get(function(userData) {
        if (userData.id) {
          Auth.user = userData;
        } else {
          Auth.user = null;
        }
        $rootScope.$broadcast('userLoginFinished', userData);
      });

    }, function(data) {
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
  $rootScope.$on('$stateChangeStart', function() {
    $rootScope.isShowFooter = false;
    // 取消上一个路由中还在请求的并且可以取消的XHR
    Util.clearAll();
  });

  $rootScope.$on('$viewContentLoaded', function() {
    if ($rootScope.isFirstLoad) {
      $rootScope.isFirstLoad = false;
    } else {
      $rootScope.isShowFooter = true;
    }
  });
});

module.exports = app;
