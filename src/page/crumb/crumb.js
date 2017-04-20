var templateUrl = require('page/crumb/index.html');

module.exports = {
  url:'^/crumb',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'CrumbCtrl',
  controllerAs: 'vm',
  data:{
    breadcrumbProxy: 'home.curmb',
    displayName: '面包屑'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./crumbCtrl.js'));
      }, 'crumb');
      return defer.promise;
    }
  }
};
