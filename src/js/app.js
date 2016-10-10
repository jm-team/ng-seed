var app = angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'jm.login']);
var tmp = require('../page/home/home.html');
var tmp2 = require('../page/about/about.html');
var news = require('../page/news/news.html');
var newsList = require('../page/news/news.list.html');
var newsDetail = require('../page/news/news.detail.html');
var newsSave = require('../page/news/news.save.html');

var loginTmp = require('../page/common/login.html');

app.tmps = {
    loginTmp: loginTmp
};
app.constant('SERVER_ADDRESS', SERVER_ADDRESS);
app.constant('CENTER_ADDRESS', CENTER_ADDRESS);
app.constant('USERCENTER_ADDRESS', USERCENTER_ADDRESS);

app.config([
    '$httpProvider',
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider',
    function ($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('home', {
                title: "首页",
                url: '/',
                templateUrl: tmp,
                controller: 'HomeCtrl',
                resolve: {
                    loadCtrl: ['$q', function ($q) {
                        var defer = $q.defer();
                        require.ensure([], function (require) {
                            defer.resolve(require('../js/controller/homeCtrl.js'));
                        }, 'home');
                        return defer.promise;
                    }]
                }
            })

            // 关于我们
            .state('about', {
                title: "关于我们",
                url: '/about',
                templateUrl: tmp2,
                controller: 'AboutCtrl',
                resolve: {
                    loadCtrl: ['$q', function ($q) {
                        var defer = $q.defer();
                        require.ensure([], function (require) {
                            defer.resolve(require('../js/controller/aboutCtrl.js'));
                        }, 'about');
                        return defer.promise;
                    }]
                }
            })

            // lists
            .state('news', {
                abstract: true,
                title:'新闻列表页',
                url:'/news',
                templateUrl: news,
                resolve:{
                    loadCtrl: ['$q', function ($q) {
                        var defer = $q.defer();
                        require.ensure([], function (require) {
                            defer.resolve(require('../js/controller/newsCtrl.js'));
                        }, 'about');
                        return defer.promise;
                    }]
                }
            })

            .state('news.list', {
                url: '/list',
                templateUrl: newsList,
                controller:'newsCtrl',
            })

            .state('news.detail', {
                url:'/:id',
                templateUrl: newsDetail,
                controller:'newsDetailCtrl',
                resolve:{
                    news: ['$stateParams', 'News', function($stateParams, News){

                        // 从服务端获取数据
                        // return News.get({id: $stateParams.id}, function(data){
                        //     return data;
                        // });
                        
                        return require('json!../mock/new.json');
                    }]
                }
            })

            .state('news.save', {
                url:'/save/:id',
                templateUrl:newsSave,
                controller:'newsSaveCtrl',
                resolve:{
                    news: ['$stateParams', 'News', function ($stateParams, News) {
                        var id = $stateParams.id;

                        // 修改
                        if(id){
                            // 从服务端获取数据
                            // return News.get({id: $stateParams.id}, function(data){
                            //     return data;
                            // });
                            return require('json!../mock/new.json');
                        }else{
                            // 新增
                            return {};
                        }
                    }]
                }
            })

            // 详情
            .state('item', {
                title: '详情页',
                url: '/item/:id',
                templateUrl: '/dist/page/bid_detail.html',
                controller: 'DetailsCtrl',
                resolve: {
                    item: ['Api', '$stateParams', function (Api, $stateParams) {
                        return Api.Lines().get({id: 1})
                    }]
                }
            })

    }
]);

app.config(['$controllerProvider', function ($controllerProvider) {
    app.registerController = $controllerProvider.register;
}]);

app.run(['$templateCache', '$rootScope',
    function ($templateCache, $rootScope) {

        //console.log($templateCache.get('/page/home/home.html'));

    }]);

module.exports = app;
