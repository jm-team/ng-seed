var templateUrl = require('./accordion.html');

module.exports = {
  title: '手风琴',
  url: '^/accordion',
  templateUrl: templateUrl,
  controller: 'AccordionCtrl',
  controllerAs:"vm",
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q, $timeout) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./accordion.controller.js'));
      }, 'accordion');
      return defer.promise;
    }
  }
};