var templateUrl = require('page/switch/index.html');

module.exports = {
  url:'^/switch',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'SwitchCtrl',
  controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/switchCtrl.js'));
      }, 'switch');
      return defer.promise;
    }
  }
};
