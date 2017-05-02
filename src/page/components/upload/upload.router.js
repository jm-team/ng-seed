var templateUrl = require('./upload.html');

module.exports = {
  url: '^/upload',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'UploadCtrl',
  controllerAs: 'vm',
  data: {
    breadcrumbProxy: 'components.upload',
    displayName: '上传'
  },
  resolve: {
    /*@ngInject*/
    loadCtrl: function ($q) {
      var defer = $q.defer();
      require.ensure([], function (require) {
        defer.resolve(require('./upload.controller.js'));
      }, 'upload');
      return defer.promise;
    }
  }
};