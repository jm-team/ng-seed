var address = require('address');
var jmui = require('component/jmui');
var app = angular.module('app', ['ui.router', 'ngResource','pasvaz.bindonce', 'ui.bootstrap', 'jmui', 'afkl.lazyImage']);
// 路由配置
var router = [
    ["notFound", require("./router/error/404.js")],
    ["home", require("./router/home/home.js")],
    ["about", require("./router/about/about.js")],
    ["news", require("./router/news/news.js")],
    ["news.list", require("./router/news/news.list.js")],
    ["news.detail", require("./router/news/news.detail.js")],
    ["news.save", require("./router/news/news.save.js")],
    ["help", require("./router/help/help.js")],
    ["chart", require("./router/chart/chart.js")],
    ["scroll", require("./router/scroll/scroll.js")]
    // ["ueditor", require("./router/ueditor/ueditor.js")]
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
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/404');

    // 配置路由
    router.forEach(function (item) {
        $stateProvider.state.apply($stateProvider, item);
    });
});

app.run(function ($state, $rootScope, $location, Cookie, Util, Address) {
    var params = $location.search();
    var shiroJID;

    if (angular.isObject(params)) {
        shiroJID = $location.search().shiroJID;
    }


    // 判断是否登录  注意： 这里服务端重定向到的地址一定是你的from上的一个静态资源 而且不能是页面上的某个路由
//    Util.createIframe(Address.SERVER_ADDRESS + '/webapi/v1/init?from=' + Address.localHost + '/dist/img/logo.png').then(function(data) {
//        // 如果有就代表已经登录
//        // data的值就是sessionID
//        if (data) {
//            Cookie.setCookie('shiroJID', data);
//            // 获取用户接口
//        }
//    }, function() {
//
//    });
});

app.run(function ($rootScope,$log, requestService, Login, Api, Auth) {
// 路由切换成功
    // , toParams, formState, formParams, options
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        $log.log('app run $stateChangeSuccess');

        Login.checkHasLogin().then(function (data) {
            $log.log('checkAutoLogin', data);
            Api.User().get({ t: +new Date() }, function(userData) {

                if (userData.id) {
                    Auth.user = userData;

                } else {
                    Auth.user = null;
                }

                $rootScope.$broadcast('userLoginFinished', userData);
            });


        },function (data) {
            // not login yet
            Auth.user = null;
            $rootScope.$broadcast('userLoginFinished', null);
            $log.log('not login yet', data)
        });

    });

    // 路由切换开始
    // event, toState, toParams, formState, formParams, options
    $rootScope.$on('$stateChangeStart', function() {
        //$log.log('app run $stateChangeStart');
        // 取消上一个路由中还在请求的并且可以取消的XHR
        requestService.clearAll();
    });
});

module.exports = app;
