var templateUrl = require('./chart.html');
module.exports = {
  title: '云詞',
  url: '^/chart',
  templateUrl: templateUrl,
  controller: 'ChartCtrl',
  data: {
    breadcrumbProxy: 'components.chart',
    displayName: '云詞'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q, $timeout) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./chart.controller.js'));
      }, 'chart');
      return defer.promise;
    }
  }
};
