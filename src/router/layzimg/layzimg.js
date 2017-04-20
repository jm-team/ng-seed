var templateUrl = require('page/layzimg/index.html');

module.exports = {
  title: '懒加载图片',
  url: '^/layzimg',
  templateUrl: templateUrl,
  controller: 'LayzimgCtrl',
  controllerAs:"vm",
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/layzimgCtrl.js'));
      }, 'layzimg');
      return defer.promise;
    }
  }
};
