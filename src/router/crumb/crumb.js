var templateUrl = require('page/crumb/index.html');

module.exports = {
  url:'^/crumb',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'CrumbCtrl',
  controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/crumbCtrl.js'));
      }, 'crumb');
      return defer.promise;
    }
  }
};
