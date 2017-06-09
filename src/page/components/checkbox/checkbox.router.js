var templateUrl = require('./checkbox.html');

module.exports = {
  title: '复选框',
  url: '^/checkbox',
  templateUrl: templateUrl,
  controller: 'CheckboxCtrl',
  controllerAs: 'vm',
  data: {
    breadcrumbProxy: 'components.checkbox',
    displayName: '复选框'
  },

  resolve: {
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./checkbox.controller.js'));
      }, 'chart');
      return defer.promise;
    }
  }
};
