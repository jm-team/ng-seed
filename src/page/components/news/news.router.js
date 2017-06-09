var templateUrl = require('./news.html');

module.exports = {
  abstract: true,
  title: '新闻列表页',
  url: '^/news',
  templateUrl: templateUrl,
  controller: 'newsCtrl',
  controllerAs: 'vm',
  data: {
    breadcrumbProxy: 'components.news.list',
    displayName: '新闻列表页'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./news.controller.js'));
      }, 'news');
      return defer.promise;
    }
  }
};
