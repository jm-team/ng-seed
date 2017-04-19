var templateUrl = require('page/tooltip/index.html');
require('page/tooltip/tooltip.html');
require("page/tooltip/tooltip2.html");

module.exports = {
  url:'^/tooltip',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'TooltipCtrl',
  controllerAs: 'vm',
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/tooltipCtrl.js'));
      }, 'tooltip');
      return defer.promise;
    }
  }
};
