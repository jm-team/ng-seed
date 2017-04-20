var templateUrl = require('page/pagintion/index.html');

module.exports = {
  url:'^/pagintion',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'PagintionCtrl',
  controllerAs: 'vm',

  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./pagintionCtrl.js'));
      }, 'pagintion');
      return defer.promise;
    }
  }
};
