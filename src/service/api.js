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
});

app.factory('Api', function ($resource, $http, Address) {
    return {
        Lines: function () {
            return $resource(Address.API_ADDRESS + '/auction/:id', {
                id: '@id'
            });
        },

        GridDataList: function () {
            return $resource('/dist/mock/gridData.json');
        },

        doLogin: function (email, password) {
            return $http.post('/webapi/doLogin', {email: email, password: password});
        },
        checkVerifyCode: function () {
            return $resource(Address.API_ADDRESS + '/validateVerifyCode/:id', {id: '@id'});
        },
        /**
         * 获得用户信息
         */
        User: function () {
            return $resource('/webapi/v1/getMsg');
        }
    }
});