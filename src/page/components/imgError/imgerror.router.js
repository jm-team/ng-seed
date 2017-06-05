var templateUrl = require('./imgerror.html');

module.exports = {
  title: '懒加载图片',
  url: '^/imgError',
  templateUrl: templateUrl,
  controller: 'ImgErrorCtrl',
  controllerAs: "vm",
  data: {
    breadcrumbProxy: 'components.imgerror',
    displayName: '图片失败加载默认图'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./imgerror.controller.js'));
      }, 'imgerror');
      return defer.promise;
    }
  }
};
