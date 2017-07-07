var marked = window.marked = require('marked');
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


app.run(function($rootScope, $log, $state, $location, Util, Login, Api, Auth, DEFAULT_SEO) {
  $rootScope.$state = $state;

  // 初始化 SEO
  $rootScope.SEO = angular.extend({}, DEFAULT_SEO);

  // 路由切换成功
  // event, toState, toParams, formState, formParams, options
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    // 百度统计pv量
    _hmt.push(['_trackPageview', $location.path()]);
    // 页面路由的title
    if(toState.title) {
      $rootScope.SEO.pageTitle = toState.title + '_Ng-seed';
    } else {
      $rootScope.SEO.pageTitle = $rootScope.DEFAULT_SEO.pageTitle;
    }
    // for SEO
    window.prerenderReady = true;

    $log.log('app run $stateChangeSuccess');
    Login.checkHasLogin().then(function(data) {

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
    // for SEO
    window.prerenderReady = false;
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
