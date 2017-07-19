var app = require('app');

// 鏈接mongo配置 // TODO: demo 项目中须修改
app.constant('API_SERVER', 'https://api.mongolab.com/api/1/databases/ng-seed/collections');
app.constant('API_KEY', 'mcnzRO1RdVBHxWEOVbtiIxD04i8H0syJ');
// 新闻api接口 // TODO: demo 项目中须修改
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

// TODO: demo 项目中须修改
app.factory('Api', function ($resource, $http, Address, SERVER_ADDRESS) {
  return {
    Lines: function () {
      return $resource(Address.API_ADDRESS + '/auction/:id', {
        id: '@id'
      });
    },

    token: function(){
      return $resource('/getUploadToken');
    },

    GridDataList: function () {
      return $resource(__webpack_require__.p + 'mock/gridData.json');
    },

    // 获取Search
    Search: function () {
      return $resource(__webpack_require__.p + 'mock/search.json');
    },

    // 获取Category
    Category: function () {
      return $resource(__webpack_require__.p + 'mock/categorys.json');
    },

    // 获取Industry
    Industry: function () {
      return $resource(__webpack_require__.p + 'mock/industrys.json');
    },

    doLogin: function (email, password) {
      return $http.post('/webapi/doLogin', {
        email: email,
        password: password
      });
    },
    checkVerifyCode: function () {
      return $resource(Address.API_ADDRESS + '/validateVerifyCode/:id', {
        id: '@id'
      });
    },
    /**
     * 获得用户信息
     */
    User: function () {
      return $resource('/webapi/v1/getMsg?t=' + new Date());
    }
  }
});
