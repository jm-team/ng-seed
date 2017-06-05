/**
 * Created by Administrator on 2017/4/20 0020.
 */
var templateUrl = require('./datepicker.html');
module.exports = {
  title: 'datepicker',
  url: '^/datepicker',
  templateUrl: templateUrl,
  controller: 'DatepickerCtrl',
  controllerAs: "vm",
  data: {
    breadcrumbProxy: 'components.datepicker',
    displayName: '日期选择'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function($q, $timeout) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./datepicker.controller.js'));
      }, 'datepicker');
      return defer.promise;
    }
  }
};
