/**
 * Created by Administrator on 2017/4/20 0020.
 */
var templateUrl = require('page/dialog/index.html');
var loginV2Tmp = require('component/login/login.html');
module.exports = {
  title: 'dialog',
  url: '^/dialog',
  templateUrl: templateUrl,
  controller: 'DialogCtrl',
  controllerAs:"vm",
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q, $timeout) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('controller/dialogCtrl.js'));
      }, 'dialog');
      return defer.promise;
    }
  }
};
