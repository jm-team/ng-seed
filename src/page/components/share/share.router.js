var templateUrl = require('./share.html');

module.exports = {
  title: '分享插件',
  url: '^/share',
  reloadOnSearch: false,
  templateUrl: templateUrl,
  controller: 'ShareCtrl',
  data: {
    breadcrumbProxy: 'components.share',
    displayName: '分享插件'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./share.controller.js'));
      }, 'share');
      return defer.promise;
    }
  }
}
