var templateUrl = require('./lazyimg.html');

module.exports = {
  title: '懒加载图片',
  url: '^/lazyimg',
  templateUrl: templateUrl,
  controller: 'LazyimgCtrl',
  controllerAs: "vm",
  data: {
    breadcrumbProxy: 'components.lazyimg',
    displayName: '图片懒加载'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./lazyimg.controller.js'));
      }, 'lazyimg');
      return defer.promise;
    }
  }
};
