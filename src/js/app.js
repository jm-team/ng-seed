var app = angular.module('app', ['ui.router'])
var tmp = require('../page/home/home.html')
var tmp2 = require('../page/about/about.html')


app.config([
  '$httpProvider',
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  function($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider){
  	  $locationProvider.html5Mode(true).hashPrefix('!');

  	  $stateProvider
		.state('home', {
			title: "首页",
			url: '/',
			templateUrl: require('../page/home/home.html'),
			controller: 'HomeCtrl',
			resolve: {
			  loadCtrl: ['$q', function($q) {
			    var defer = $q.defer();
			    require.ensure([], function(require) {
			      defer.resolve(require('../js/controller/testCtrl.js'));
			    }, 'home');
			    return defer.promise;
			  }]
			}
		})

      	// 运费特惠路由
	    .state('about', {
  			title: "关于我们",
  			url: '/about',
  			templateUrl:tmp2,
	    })
  }
])


app.run(['$templateCache', '$rootScope', function($templateCache, $rootScope){
  //console.log($templateCache.get('/page/home/home.html'));

}])

module.exports = app
