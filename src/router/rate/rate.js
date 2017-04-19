var templateUrl = require('page/rate/index.html');

module.exports = {
  url:'^/rate',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'RateCtrl',
  controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/rateCtrl.js'));
      }, 'rate');
      return defer.promise;
    }
  }
};
