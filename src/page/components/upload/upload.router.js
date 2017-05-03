var templateUrl = require('./upload.html');

module.exports = {
  title: '上传',
  url: '^/upload',
  templateUrl: templateUrl,
  data: {
    breadcrumbProxy: 'components.upload',
    displayName: '上传'
  }
};