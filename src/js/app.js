/**
 * 创建app 模块 并在这里配置路由 最后返回这个模块
 */


let app = angular.module('jytApp', ['ui.router', 'ngResource']);
//var css = require("css")
//cosnole.log(css)
// head上的title
app.constant('TITLE', {
  "home": "首页",
  "specials": "运费特惠",
  "orders": "我要下单",
  "enquiry": "我要询价",
  "bid": "物流竞价",
  "track": "物流跟踪",
  "service": "服务介绍",
  "enterprises": "企业信息",
  "ganders": "园区信息"
});


//请求服务器地址
// app.constant('SERVER_ADDRESS', 'http://192.168.23.234\:8080/webapi');
app.constant('SERVER_ADDRESS', 'http://192.168.23.218\:8080/webapi');
// app.constant('SERVER_ADDRESS', 'http://192.168.23.218\:8080/webapi');
// app.value('TOKEN', '');

// 测试的服务器地址

//  拦截器
app.factory('httpInterceptor', ['$q', '$injector', 'Cookie', 'requestService', 'TokenHandler',
  ($q, $injector, Cookie, requestService, TokenHandler) => {
    var httpInterceptor;
    httpInterceptor = {
      responseError: (response) => {
        switch (response.status) {
          case 401:
            location.href = "http://192.168.23.218:8080/webapi/user/login?successful=http://192.168.23.208:3000";
            break;
        }
        return $q.reject(response);
      },

      response: (response) => {
        return response;
      },

      request: (config) => {
        console.log(config);
        var shiroJID = Cookie.getCookie('shiroJID');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        if (shiroJID) {
          config.headers['shirojid'] = shiroJID;
        }

        if (TokenHandler.token) {
          config.headers['token'] = TokenHandler.token;
        }

        // 将可以取消的请求 放到数组进行管理
        // 用于在路由跳转后 取消上一个路由的
        // 中还在请求的request
        if (angular.isObject(config.params) && config.params.canCancel) {
          let defer = $q.defer();
          config.timeout = defer.promise;
          requestService.requests.push(defer);
        }

        return config;
      },

      requestError: (config) => {return $q.reject(config);}
    };
    return httpInterceptor;
  }
]);

app.run([
  '$rootScope',
  '$state',
  '$stateParams',
  '$location',
  'Cookie',
  'TITLE',
  'requestService',
  'Public',
  'TokenHandler',
  '$timeout',
  'SERVER_ADDRESS',
  ($rootScope, $state, $stateParams, $location, Cookie, TITLE, requestService, Public, TokenHandler, $timeout, SERVER_ADDRESS) => {
    window.C = Cookie;
    $rootScope.serverAddress = SERVER_ADDRESS;
    var jCookie = $location.search();
    console.log(document.cookie);
    if (jCookie.shiroJID) {
      Cookie.setCookie('shiroJID', jCookie.shiroJID);
    }
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    if (jCookie) {
      $timeout(() => {
        $location.search('');
      }, 100);
    }

    var shiroJID = Cookie.getCookie('shiroJID');
    if (shiroJID) {
      Public.Token().get({}, (data) => {
        TokenHandler.set(data.data);
        Public.token = data.data;
      });
    }


    // 路由切换成功
    // , toParams, formState, formParams, options
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
      $rootScope.title = TITLE[toState.name]
    });

    // 路由切换开始
    // event, toState, toParams, formState, formParams, options
    $rootScope.$on('$stateChangeStart', () => {
      // 取消上一个路由中还在请求的XHR
      requestService.clearAll();
    });
  }
]);

// 将 controllerProvider 挂载到app 上
app.config(['$controllerProvider', '$compileProvider', '$provide',
  ($controllerProvider, $compileProvider, $provide) => {
    app.registerController = $controllerProvider.register;
    app.directiveProvider = $compileProvider.directive;
    app.serviceProvider = $provide.service;
  }
]);

// 拦截器
app.config(['$httpProvider', ($httpProvider) => $httpProvider.interceptors.push('httpInterceptor')]);


// 配置路由
app.config([
  '$httpProvider',
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  ($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('', '/');
    // 登录页面
    $stateProvider
      .state('home', {
        title: "首页",
        url: '/',
        templateUrl: '/dist/page/home.html',
        controller: 'HomeCtrl',
        resolve: {
          loadCtrl: ['$q', ($q) => {
            let defer = $q.defer();

            require.ensure([], (require) => {
              defer.resolve(require('../js/controller/home.js'));
            });

            return defer.promise;
          }]
        }
      })

    /*
     *  运费特惠
     */
    .state('specials', {
      title: "运费特惠",
      url: '/specials',
      templateUrl: '/dist/page/specials.html',
      controller: 'SpecialsCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          let defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/specials.js'));
          });

          return defer.promise;
        }]
      }
    })

    /*
     *  我要下单
     */
    .state('orders', {
      title: '我要下单',
      url: '/orders',
      templateUrl: '/dist/page/orders.html',
      controller: 'OrderCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          let defer = $q.defer();
          require.ensure([], function(require) {
            defer.resolve(require('../js/controller/order.js'));
          });

          return defer.promise;
        }]
      }
    })

    /*
     *  我要询价
     */
    .state('enquiry', {
      url: '/enquiry',
      templateUrl: '/dist/page/enquiry.html',
      controller: 'EnquiryCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          let defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/enquiry.js'));
          });
          return defer.promise;
        }]
      }
    })

    /*
     *  物流竞价
     */
    .state('bid', {
      url: '/bid',
      templateUrl: '/dist/page/bid.html',
      controller: 'BidCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          var defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/bid.js'));
          });
          return defer.promise;
        }]
      }
    })

    /*
     *  物流跟踪
     */
    .state('track', {
      url: '/track',
      templateUrl: '/dist/page/track.html',
      controller: 'TrackCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          var defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/track.js'));
          });
          return defer.promise;
        }]
      }
    })

    /*
     *  服务介绍
     */
    .state('service', {
      url: '/service',
      templateUrl: '/dist/page/service.html',
      controller: 'ServiceCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          var defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/service.js'));
          });
          return defer.promise;
        }]
      }
    })

    /*
     *  企业信息
     */
    .state('enterprises/:id', {
      url: 'enterpris',
      templateUrl: '/dist/page/enterpris.html',
      controller: 'EnterprisCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          var defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/enterpris.js'));
          });
          return defer.promise;
        }]
      }
    })

    /*
     *  园区信息
     */
    .state('ganders', {
      url: '/ganders',
      templateUrl: '/dist/page/ganders.html',
      controller: 'GandersCtrl',
      resolve: {
        loadCtrl: ['$q', ($q) => {
          var defer = $q.defer();
          require.ensure([], (require) => {
            defer.resolve(require('../js/controller/gander.js'));
          });
          return defer.promise;
        }]
      }
    })
  }
]);

module.exports = app;
