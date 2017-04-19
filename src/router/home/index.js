var templateUrl = require('page/home/index.html');

module.exports = {
  title: "首页",
  url:"/home",
  // abstract: true,
  templateUrl: templateUrl,
  // controller: 'HomeCtrl',
  // controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/homeCtrl.js'));
      }, 'home');
      return defer.promise;
    }
  }
};
