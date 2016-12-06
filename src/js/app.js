var address = require('address');
var app = angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'jm.login', 'afkl.lazyImage']);
// 路由配置
var router = [
    ["notFound", require("./router/error/404.js")],
    ["home", require("./router/home/home.js")],
    ["about", require("./router/about/about.js")],
    ["news", require("./router/news/news.js")],
    ["news.list", require("./router/news/news.list.js")],
    ["news.detail", require("./router/news/news.detail.js")],
    ["news.save", require("./router/news/news.save.js")],
    ["tab", require("./router/tab.js")],
    ["help", require("./router/help/help.js")]
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

module.exports = app;
