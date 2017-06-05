var templateUrl = require('./components.html');

module.exports = {
  title: "组件",
  url: "/components",
  data: {
    breadcrumbProxy: 'components',
    displayName: '组件'
  },
  templateUrl: templateUrl,
  /*@ngInject*/
  controller: function($scope) {

    $scope.indexCrumb = {
      displayName: "首页",
      router: "home"
    }
  },
  // controller: 'HomeCtrl',
  // controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      // var defer = $q.defer();
      // require.ensure([], function (require) {
      //   defer.resolve(require('./../home/home.controller.js'));
      // }, 'home');
      // return defer.promise;
    }
  }
};
