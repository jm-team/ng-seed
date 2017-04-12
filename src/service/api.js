var app = require('app');

/* 新闻api接口 */
app.factory('News', function ($resource, API_SERVER, API_KEY) {
  return $resource(API_SERVER + '/news/:id', {
    id: '@id',
    apiKey: API_KEY
  }, {
      update: {
        method: 'PUT'
      }
  });
})