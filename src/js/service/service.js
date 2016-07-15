/**
 * Created by Administrator on 2016/7/4 0004.
 */
var app = require('app');

// 验证用户信息
app.factory('AuthService', ['$resource', 'SERVER_ADDRESS',
  ($resource, SERVER_ADDRESS) => {
    return $resource(SERVER_ADDRESS + '/user/getUserInfo');
  }
]);


// demo
app.factory('demo', ['$resource', ($resource) => {
  return $resource('/api/lists');
}]);

// Session
app.factory('SessionService', function() {
  return {
    // 存储用户信息
    user: null,

    // 创建用户
    createUser: function(val) {
      this.user = val;
    },

    // 设置用户信息
    setUser(arg, value) {
      // 传入一个对象
      if (angular.isObject(arg)) {
        var _this = this;
        angular.forEach(arg, (value, key) => _this[key] = value);
        // 传入一个key 值
      } else if (angular.isUndefined(arg) && angular.isString(arg) && angular.isUndefined(value)) {
        angular.isObject(this.user) && (this.user[arg] = value);
      }
    },

    // 删除用户 清空
    removeUser() {
      this.user = null;
    },

    // 删除用户一个属性
    removeUserAttr(key) {
      this.user && delete this.user[key];
    },

    // 获取当前用户
    getUser() {
      return this.user;
    }
  }
});

// TOKEN 管理
app.factory('TokenHandler', function () {
  return {
    token: '',

    // 设置TOKEN
    set(t) {
      this.token = t;
    },

    // 获取TOKEN
    get(){
        return this.token || '';
    },

    // 删除TOKEN
    removeToken() {
      this.token = '';
    }
  }
});

//  公用API
app.factory('Public', [
  '$resource',
  'SERVER_ADDRESS',
  '$q',
  ($resource, SERVER_ADDRESS, $q) => {
  return {

    token: '',

    // 基础数据
    base: null,

    // 验证码
    Captchas() {
      return $resource(SERVER_ADDRESS + '/captchas');
    },

    // banner
    Banner() {
      return $resource(SERVER_ADDRESS + '/banners');
    },

    // Footers
    Footer() {
      return $resource(SERVER_ADDRESS + '/footers');
    },

    // Token
    Token() {
      return $resource(SERVER_ADDRESS + '/token');
      // http://192.168.23.218\:8080
    },

    // 基础数据
    Base() {
      return $resource(SERVER_ADDRESS + '/base/data');
    },

    // 获取基础
    // 首先在服务中获取 如果
    // 服务中没有在远程请求数据
    // 将结果保存到本地服务中
    // 以便下次请求直接从服务中读取
    getBase(types) {
      var defer = $q.defer();
      var typesCache = this.base;
      var getTypesRequest = [];
      var getJsonTypes = {};
      var _this = this;

      function checkCache(t) {
        if (angular.isArray(typesCache[t])) {
          getJsonTypes[t] = typesCache[t];
        } else {
          getTypesRequest.push(t);
        }
      }

      if (!typesCache) {
        this.Base().get({ type: types }, (data) => {
          defer.resolve(_this.base = angular.extend(getJsonTypes, data.data));
        });
      } else {
        if (angular.isArray(types)) {
          angular.forEach(types, (req) => checkCache(req));
        } else if (types && angular.isString(types)) {
          checkCache(types);
        }

        if (!getTypesRequest.length) {
          return $q.when(getJsonTypes);
        } else {
          this.Base().get({ type: getTypesRequest }, (data) => {
            defer.resolve(_this.base = angular.extend(getJsonTypes, data.data));
          })
        }
      }

      return defer.promise;
    },

    Batch() {
      return $resource(SERVER_ADDRESS + '/__f.do');
      // return $resource( 'http://192.168.1.51:8080/dove-boy/__f.do');
    }
  };
  //http://192.168.23.205:8888/logistics/account/findOne
}]);

// cookie 操作方法
app.factory('Cookie', () => {
  return {
    //简单的设置COOKIE方法
    //name为cookie的名
    //val为cookie的值
    //date为设置过期的时间
    setCookie(name, val, date) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + date);
      var sDate = angular.isUndefined(date) ? "" : ";expires=" + oDate;
      document.cookie = name + "=" + val + sDate;
    },

    //获取COOKIE方法
    //参数name为cookie的名
    getCookie(name) {
      var sCookies = document.cookie;
      var arr = sCookies.split('; ');
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] = name) {
          return arr2[1];
        }
      }
    },

    //删除COOKIE
    //参数name为cookie的名
    delCookie(name) {
      this.setCookie(name, 'val', -1);
    },

    //获取cookies的个数
    cookieLength() {
      var sCookie = document.cookie;
      if (!sCookie) {
        return "没有cookie";
      }
      var arr = sCookie.split('; ');
      return arr.length;
    }
  }
});

app.factory('requestService', () => {
  return {
    requests: [],

    // 清除所有带canCancel参数的请求
    // 用于路由跳转之后 前一个路由
    // 还在请求
    clearAll() {
      angular.forEach(this.requests, (req) => req.resolve());
      this.requests = [];
    }
  }
});
