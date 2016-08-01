
var app = require('app');
/**
 * 验证用户信息
 * @param  {[type]} $resource       [Angular resource 库]
 * @param  {[type]} SERVER_ADDRESS  [ 数据请求IP ]
 * @return {[type]}                 [description]
 */
app.factory('AuthService', ['$resource', 'SERVER_ADDRESS', function($resource, SERVER_ADDRESS) {
  return $resource(SERVER_ADDRESS + '/user/getUserInfo');
}]);


// // demo
// app.factory('demo', ['$resource', function($resource) {
//   return $resource('/api/lists');
// }]);

/**
 * 存储当前用户信息和状态
 * @param  {[type]}          [description]
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */
app.factory('SessionService', function() {
  return {
    // 存储用户信息
    user: null,

    /**
     * [createUser 创建当前登录用户]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    createUser: function(val) {
      this.user = val;
    },

    // 设置用户信息
    /**
     * [setUser 设置用户信息]
     * @param {[ Object | String ]} arg   [ 用户 key=> value的JSON | 用户的属性 ]
     * @param {[ Any ]} value             [ [可选] 当arg是String 用户的值 ]
     */
    setUser: function(arg, value) {

      // 传入一个对象
      if (angular.isObject(arg)) {
        var _this = this;
        angular.forEach(arg, function(value, key) {
          _this[key] = value
        });

        // 传入一个key 值
      } else if (angular.isUndefined(arg) && angular.isString(arg) && angular.isUndefined(value)) {
        angular.isObject(this.user) && (this.user[arg] = value);
      }

    },

    /**
     * [removeUser 删除用户]
     * @return {[type]} [description]
     */
    removeUser: function() {
      this.user = null;
    },


    /**
     * [removeUserAttr 删除用户某个属性]
     * @param  {[type]} key [ 指定的属性 ]
     * @return {[type]}     [description]
     */
    removeUserAttr: function(key) {
      this.user && delete this.user[key];
    },

    /**
     * [getUser 获取当前用户信息]
     * @return {[type]} [description]
     */
    getUser: function() {
      return this.user;
    }
  }
});

/**
 * [TOKEN]
 * @return {[type]}             [description]
 */
app.factory('TokenHandler', function() {
  return {
    token: '',

    /**
     * [set 设置TOKEN]
     * @param {[ String ]} value [token值]
     */
    set: function(value) {
      this.token = value;
    },

    /**
     * [get 获取TOKEN]
     * @return {[ String ]} [token值 没有返回空字符]
     */
    get: function() {
      return this.token || '';
    },

    /**
     * [removeToken 删除TOKEN]
     * @return {[type]} [description]
     */
    removeToken: function() {
      this.token = '';
    }
  }
});


/**
 * move - 动画效果
 *
 * @param  {type} 'Move'    description
 * @param  {type} function( description
 * @return {type}           description
 */
app.factory('Move', function() {

  /*
   * Tween.js
   * t: current time（当前时间）
   * b: beginning value（初始值）
   * c: change in value（变化量）
   * d: duration（持续时间）
   */
  var Tween = {
    // 匀速
    linear: function(t, b, c, d) {
      return c * t / d + b;
    },

    // 加速曲线
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },

    // 减速曲线
    easeOut: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },

    // 加速减速曲线
    easeBoth: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },

    // 加加速曲线
    easeInStrong: function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },

    // 减减速曲线
    easeOutStrong: function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },

    // 加加速减减速曲线
    easeBothStrong: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      }
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },

    // 正弦衰减曲线（弹动渐入）
    elasticIn: function(t, b, c, d, a, p) {
      if (t === 0) {
        return b;
      }
      if ((t /= d) == 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },

    //正弦增强曲线（弹动渐出）
    elasticOut: function(t, b, c, d, a, p) {
      if (t === 0) {
        return b;
      }
      if ((t /= d) == 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },

    elasticBoth: function(t, b, c, d, a, p) {
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) == 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      }
      return a * Math.pow(2, -10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },

    // 回退加速（回退渐入）
    backIn: function(t, b, c, d, s) {
      if (typeof s == 'undefined') {
        s = 1.70158;
      }
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },

    // 回缩的距离
    backOut: function(t, b, c, d, s) {
      if (typeof s == 'undefined') {
        s = 3.70158;
      }
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },

    backBoth: function(t, b, c, d, s) {
      if (typeof s == 'undefined') {
        s = 1.70158;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },

    // 弹球减振（弹球渐出）
    bounceIn: function(t, b, c, d) {
      return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },

    bounceOut: function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
      }
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },

    bounceBoth: function(t, b, c, d) {
      if (t < d / 2) {
        return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
      }
      return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
  }


  /**
   * getStyle - 获取DOM的指令样式
   *
   * @param  {DOM} obj      DOM元素
   * @param  {String} attr 指定的样式
   * @return {String}      元素指定样式的值
   */
  function getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, false)[attr];
    }
  }


  /**
   * now - 获取当前时间戳
   *
   * @return {Nunmber}
   */
  function now() {
    return (new Date()).getTime();
  }

  /**
   * move - 动画函数
   *
   * @param  {DOM} obj    需要动画的DOM元素
   * @param  {Object} json  需要改变的样式
   * @param  {Number} times 动画需要的时间
   * @param  {String} fx    动画的形式
   * @param  {Function} fn    动画的回调函数
   * @return {type}
   */
  function move(obj, json, times, fx, fn) {

    if (typeof times == 'undefined') {
      times = 400;
      fx = 'linear';
    }

    if (typeof times == 'string') {
      if (typeof fx == 'function') {
        fn = fx;
      }
      fx = times;
      times = 400;
    } else if (typeof times == 'function') {
      fn = times;
      times = 400;
      fx = 'linear';
    } else if (typeof times == 'number') {
      if (typeof fx == 'function') {
        fn = fx;
        fx = 'linear';
      } else if (typeof fx == 'undefined') {
        fx = 'linear';
      }
    }

    var iCur = {};

    for (var attr in json) {
      iCur[attr] = 0;

      if (attr == 'opacity') {
        iCur[attr] = Math.round(getStyle(obj, attr) * 100);
      } else if (attr == 'scrollTop') {
        iCur[attr] = obj.scrollTop;
      } else {
        iCur[attr] = parseInt(getStyle(obj, attr));
      }

    }

    var startTime = now();

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

      var changeTime = now();

      var t = times - Math.max(0, startTime - changeTime + times); //0到2000

      for (var attr in json) {

        var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);

        if (attr == 'opacity') {
          obj.style.opacity = value / 100;
          obj.style.filter = 'alpha(opacity=' + value + ')';
        } else if (attr == 'scrollTop') {
          obj.scrollTop = value;
        } else {
          obj.style[attr] = value + 'px';
        }

      }

      if (t == times) {
        clearInterval(obj.timer);
        if (fn) {
          fn.call(obj);
        }
      }

    }, 13);
  }
  return {
    move: move,
    Tween: Tween
  }
});



/**
 * [共用API 和 信息]
 * @param  {[type]} $resource      [ Angular resource库 ]
 * @param  {[type]} SERVER_ADDRESS [ 请求服务IP ]
 * @param  {[type]} $q             [ Angular 自带promise ]
 * @param  {[type]} Banner:        function()    {                return $resource(SERVER_ADDRESS +      '/banners');                   } [description]
 * @param  {[type]} Footer:        function()    {                return $resource(SERVER_ADDRESS +      '/footers'   [description]
 * @return {[type]}                [description]
 */
app.factory('Public', [
  '$resource',
  'SERVER_ADDRESS',
  '$q',
  function($resource, SERVER_ADDRESS, $q) {
    return {

      token: '',

      // 基础数据
      base: null,

      // 验证码
      Captchas: function() {
        return $resource(SERVER_ADDRESS + '/captchas');
      },

      // banner

      // Footers
      Footer: function() {
        return $resource(SERVER_ADDRESS + '/footers');
      },

      // Token
      Token: function() {
        return $resource(SERVER_ADDRESS + '/token');
        // http://192.168.23.218\:8080
      },

      // 基础数据
      Base: function() {
        return $resource(SERVER_ADDRESS + '/base/data');
      },

      // 获取基础
      // 首先在服务中获取 如果
      // 服务中没有在远程请求数据
      // 将结果保存到本地服务中
      // 以便下次请求直接从服务中读取
      getBase: function(types) {
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
          this.Base().get({
            type: types
          }, function(data) {
            defer.resolve(_this.base = angular.extend(getJsonTypes, data.data));
          });
        } else {
          if (angular.isArray(types)) {
            angular.forEach(types, function(req) {
              checkCache(req)
            });
          } else if (types && angular.isString(types)) {
            checkCache(types);
          }

          if (!getTypesRequest.length) {
            return $q.when(getJsonTypes);
          } else {
            this.Base().get({
              type: getTypesRequest
            }, function(data) {
              defer.resolve(_this.base = angular.extend(getJsonTypes, data.data));
            })
          }
        }

        return defer.promise;
      },

      Batch: function() {
        return $resource(SERVER_ADDRESS + '/__f.do');
        // return $resource( 'http://192.168.1.51:8080/dove-boy/__f.do');
      }
    };
    //http://192.168.23.205:8888/logistics/account/findOne
  }
]);

// API
app.factory('API', ['$resource', '$q', 'SERVER_ADDRESS', function($resource, $q, SERVER_ADDRESS) {
  return {

    /**
     * [Banner 首页banner ]
     *
     * @return { Array }  返回首页banner资源
     */
    Banner: function() {
        return $resource(SERVER_ADDRESS + '/banners');
    },


    /**
     * hotKeyword - 首页热门搜索关键字
     *
     * @return { Array }  返回热门搜索关键字资源
     */
    HotKeyword: function() {
      return $resource(SERVER_ADDRESS + '/mocks/hotKeyword.json');
    },


    /**
     * capacity - 运力信息
     *
     * @return { Object }  返回运力信息资源
     */
    Capacity: function() {
        return $resource('http://192.168.23.159:8890/api/v1/capacity');
      // return $resource(SERVER_ADDRESS + '/mocks/capacity.json');
    },


    /**
     * stroage - 仓储出租
     *
     * @return { Object }  返回仓储出租资源
     */
    Stroage: function() {
        return $resource('http://192.168.23.159:8890/api/v1/stroage');
      // return $resource(SERVER_ADDRESS + '/mocks/storage.json');
    },


    /**
     * auction - 竞拍信息
     *
     * @return {type}  返回竞拍信息资源
     */
    Auction: function() {
        return $resource('http://192.168.23.159:8890/api/v1/auction');
      // return $resource(SERVER_ADDRESS + '/mocks/auction.json');
    },

    /**
     * footer - 底部信息描述
     *
     * @return {type}  返回底部信息描述资源
     */
    Footer: function() {
      return $resource(SERVER_ADDRESS + '/mocks/footer.json');
    },


    /**
     * artner - 合作伙伴
     *
     * @return {type}  返回合作伙伴资源
     */
    Artner: function() {
      return $resource(SERVER_ADDRESS + '/mocks/artner.json');
    },


    /**
     * special - 运费特惠线路列表
     *
     * @return {type}  返回运费特惠线路列表资源
     */
    Special: function() {
      return $resource(SERVER_ADDRESS + '/mocks/specials.json');
    },


    /**
     * Enquiry - 我要询价线路列表
     *
     * @return {type}  description
     */
    Enquiry: function(){
        return $resource(SERVER_ADDRESS + '/mocks/enquiry.json');
    }
  }
}])

/**
 * move - 动画效果
 *
 * @param  {type} 'dataCacha'    数据缓存 存储一些不经常改变的数据
 * @param  {type} function( description
 * @return {type}           description
 */
app.factory('dataCacha', [
  function() {
    return {
      keys: [],

      // 合作伙伴
      partners: [],

      // 底部操作指南
      guide: [],

      // 底部物流学院
      institutes: []
    }
  }
])

/**
 * [Cookie 操作]
 * @return {[type]}             [description]
 */
app.factory('Cookie', function() {
  return {
    /**
     * [setCookie Cookie设置]
     * @param {[type]} name [ cookie的名 ]
     * @param {[type]} val  [ cookie的值 ]
     * @param {[type]} date [ 过期的时间 ]
     */
    setCookie: function(name, val, date) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + date);
      var sDate = angular.isUndefined(date) ? "" : ";expires=" + oDate;
      document.cookie = name + "=" + val + sDate;
    },

    /**
     * [getCookie 获取Cookie]
     * @param  {[ type ]} name [ cookie的名 ]
     * @return {[ String ]}      [ 指定的cookie值 ]
     */
    getCookie: function(name) {
      var sCookies = document.cookie;
      var arr = sCookies.split('; ');
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] = name) {
          return arr2[1];
        }
      }
    },

    /**
     * [delCookie 删除Cookie]
     * @param  {[type]} name [cookie的名]
     * @return {[type]}      [description]
     */
    delCookie: function(name) {
      this.setCookie(name, 'val', -1);
    },

    /**
     * [cookieLength 获取Cookie个数]
     * @return {[ Number ]} [ Cookie个数 ]
     */
    cookieLength: function() {
      var sCookie = document.cookie;
      if (!sCookie) {
        return 0;
      }
      var arr = sCookie.split('; ');
      return arr.length;
    }
  }
});

/**
 * [请求服务]
 * @param  {Array}   [description]
 * @return {[type]}  [description]
 */
app.factory('requestService', function() {
  return {
    requests: [],
    /**
     * [clearAll 清除所有带canCancel参数的请求]
     * @return {[type]} [description]
     */
    clearAll: function() {
      angular.forEach(this.requests, function(req) {
        req.resolve();
      })
      this.requests = [];
    }
  }
});
