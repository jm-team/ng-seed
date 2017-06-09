var templateUrl = require('./crumb.html');

module.exports = {
  url: '^/crumb',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'CrumbCtrl',
  controllerAs: 'vm',
  data: {
    breadcrumbProxy: 'components.crumb',
    displayName: '面包屑'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./crumb.controller.js'));
      }, 'crumb');
      return defer.promise;
    }
  }
};
