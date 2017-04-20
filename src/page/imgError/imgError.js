var templateUrl = require('page/imgError/index.html');

module.exports = {
  title: '懒加载图片',
  url: '^/imgError',
  templateUrl: templateUrl,
  controller: 'ImgErrorCtrl',
  controllerAs:"vm",
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./imgErrorCtrl.js'));
      }, 'imgError');
      return defer.promise;
    }
  }
};
