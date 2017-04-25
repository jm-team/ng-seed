var templateUrl = require('./home.html');

module.exports = {
  title: "首页",
  url: '/',
  templateUrl: templateUrl,
  controller: 'HomeCtrl',
  controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./home.controller.js'));
      }, 'home');
      return defer.promise;
    }
  }
};
