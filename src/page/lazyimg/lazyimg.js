var templateUrl = require('page/lazyimg/index.html');

module.exports = {
  title: '懒加载图片',
  url: '^/lazyimg',
  templateUrl: templateUrl,
  controller: 'LazyimgCtrl',
  controllerAs:"vm",
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./lazyimgCtrl.js'));
      }, 'lazyimg');
      return defer.promise;
    }
  }
};
