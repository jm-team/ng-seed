var app = angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'jm.login']);
var tmp = require('../page/home/home.html');
var tmp2 = require('../page/about/about.html');
var news = require('../page/news/news.html');
var newsList = require('../page/news/news.list.html');
var newsDetail = require('../page/news/news.detail.html');
var newsSave = require('../page/news/news.save.html');


app.tmps = {
    loginTmp: require('../page/common/login.html'),
    notFoundTmp: require('../page/error/404.html')
};

// 鏈接mongo配置
app.constant('API_SERVER', 'https://api.mongolab.com/api/1/databases/ng-seed/collections');
app.constant('API_KEY', 'mcnzRO1RdVBHxWEOVbtiIxD04i8H0syJ');


app.constant('SERVER_ADDRESS', SERVER_ADDRESS);
app.constant('CENTER_ADDRESS', CENTER_ADDRESS);
app.constant('USERCENTER_ADDRESS',USERCENTER_ADDRESS);


app.config([
    '$httpProvider',
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider',
    function ($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');


        $stateProvider
            .state('notFound', {
                url: '/404',
                templateUrl: app.tmps.notFoundTmp,
                controller: 'HomeCtrl',
                data:{
                    displayName:''
                }
            })
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
                name:'关于我们',
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
                data:{
                    breadcrumbProxy: 'news.list',
                    displayName: '新闻列表页'
                },
                resolve:{
                    loadCtrl: ['$q', function ($q) {
                        var defer = $q.defer();
                        require.ensure([], function (require) {
                            defer.resolve(require('../js/controller/newsCtrl.js'));
                        }, 'news');
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
                data:{
                    displayName: '{{news.title}}'
                },
                resolve:{
                    
                    news: ['$stateParams', 'News', '$q',function($stateParams, News,$q){
                        var defer = $q.defer();
                        // 从服务端获取数据
                        News.get({id: $stateParams.id}, function(data){
                            defer.resolve(data) ;
                        });
                        return defer.promise;
                    }]
                }
            })

            .state('news.save', {
                url:'/save/:id',
                templateUrl:newsSave,
                controller:'newsSaveCtrl',
                resolve:{
                    news: ['$stateParams', 'News', '$q', function ($stateParams, News, $q) {
                        var id = $stateParams.id;
                        var defer  = $q.defer();
                        // 修改
                        if(id){
                            News.get({id: $stateParams.id}, function(data){
                                defer.resolve(data);
                            });
                            
                        }else{
                            // 新增
                            return $q.when({});
                        }

                        return defer.promise;
                    }]
                }
            });

    }
]);

app.config( function ($controllerProvider) {
    app.registerController = $controllerProvider.register;
    app.$controllerProvider = $controllerProvider;
});

app.run(['$templateCache', '$rootScope',
    function ($templateCache, $rootScope) {

        //console.log($templateCache.get('/page/home/home.html'));

    }]);

module.exports = app;
