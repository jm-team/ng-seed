webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by Administrator on 2016/7/4 0004.
	 */
	__webpack_require__(1);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 创建app 模块 并在这里配置路由 最后返回这个模块
	 */

	var app = angular.module('jytApp', ['ui.router', 'ngResource']);
	//var css = require("css")
	//cosnole.log(css)
	// head上的title
	app.constant('TITLE', {
	  "home": "首页",
	  "specials": "运费特惠",
	  "orders": "我要下单",
	  "enquiry": "我要询价",
	  "bid": "物流竞价",
	  "track": "物流跟踪",
	  "service": "服务介绍",
	  "enterprises": "企业信息",
	  "ganders": "园区信息"
	});

	//请求服务器地址
	// app.constant('SERVER_ADDRESS', 'http://192.168.23.234\:8080/webapi');
	app.constant('SERVER_ADDRESS', 'http://192.168.23.218\:8080/webapi');
	// app.constant('SERVER_ADDRESS', 'http://192.168.23.218\:8080/webapi');
	// app.value('TOKEN', '');

	// 测试的服务器地址

	//  拦截器
	app.factory('httpInterceptor', ['$q', '$injector', 'Cookie', 'requestService', 'TokenHandler', function ($q, $injector, Cookie, requestService, TokenHandler) {
	  var httpInterceptor;
	  httpInterceptor = {
	    responseError: function responseError(response) {
	      switch (response.status) {
	        case 401:
	          location.href = "http://192.168.23.218:8080/webapi/user/login?successful=http://192.168.23.208:3000";
	          break;
	      }
	      return $q.reject(response);
	    },

	    response: function response(_response) {
	      return _response;
	    },

	    request: function request(config) {
	      console.log(config);
	      var shiroJID = Cookie.getCookie('shiroJID');
	      config.headers['X-Requested-With'] = 'XMLHttpRequest';

	      if (shiroJID) {
	        config.headers['shirojid'] = shiroJID;
	      }

	      if (TokenHandler.token) {
	        config.headers['token'] = TokenHandler.token;
	      }

	      // 将可以取消的请求 放到数组进行管理
	      // 用于在路由跳转后 取消上一个路由的
	      // 中还在请求的request
	      if (angular.isObject(config.params) && config.params.canCancel) {
	        var defer = $q.defer();
	        config.timeout = defer.promise;
	        requestService.requests.push(defer);
	      }

	      return config;
	    },

	    requestError: function requestError(config) {
	      return $q.reject(config);
	    }
	  };
	  return httpInterceptor;
	}]);

	app.run(['$rootScope', '$state', '$stateParams', '$location', 'Cookie', 'TITLE', 'requestService', 'Public', 'TokenHandler', '$timeout', 'SERVER_ADDRESS', function ($rootScope, $state, $stateParams, $location, Cookie, TITLE, requestService, Public, TokenHandler, $timeout, SERVER_ADDRESS) {
	  window.C = Cookie;
	  $rootScope.serverAddress = SERVER_ADDRESS;
	  var jCookie = $location.search();
	  console.log(document.cookie);
	  if (jCookie.shiroJID) {
	    Cookie.setCookie('shiroJID', jCookie.shiroJID);
	  }
	  $rootScope.$state = $state;
	  $rootScope.$stateParams = $stateParams;

	  if (jCookie) {
	    $timeout(function () {
	      $location.search('');
	    }, 100);
	  }

	  var shiroJID = Cookie.getCookie('shiroJID');
	  if (shiroJID) {
	    Public.Token().get({}, function (data) {
	      TokenHandler.set(data.data);
	      Public.token = data.data;
	    });
	  }

	  // 路由切换成功
	  // , toParams, formState, formParams, options
	  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
	    $rootScope.title = TITLE[toState.name];
	  });

	  // 路由切换开始
	  // event, toState, toParams, formState, formParams, options
	  $rootScope.$on('$stateChangeStart', function () {
	    // 取消上一个路由中还在请求的XHR
	    requestService.clearAll();
	  });
	}]);

	// 将 controllerProvider 挂载到app 上
	app.config(['$controllerProvider', '$compileProvider', '$provide', function ($controllerProvider, $compileProvider, $provide) {
	  app.registerController = $controllerProvider.register;
	  app.directiveProvider = $compileProvider.directive;
	  app.serviceProvider = $provide.service;
	}]);

	// 拦截器
	app.config(['$httpProvider', function ($httpProvider) {
	  return $httpProvider.interceptors.push('httpInterceptor');
	}]);

	// 配置路由
	app.config(['$httpProvider', '$locationProvider', '$urlRouterProvider', '$stateProvider', function ($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
	  $locationProvider.html5Mode(true);
	  $urlRouterProvider.when('', '/');
	  // 登录页面
	  $stateProvider.state('home', {
	    title: "首页",
	    url: '/',
	    templateUrl: '/dist/page/home.html',
	    controller: 'HomeCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();

	        __webpack_require__.e/* nsure */(1, function (require) {
	          defer.resolve(__webpack_require__(2));
	        });

	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  运费特惠
	   */
	  .state('specials', {
	    title: "运费特惠",
	    url: '/specials',
	    templateUrl: '/dist/page/specials.html',
	    controller: 'SpecialsCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(2, function (require) {
	          defer.resolve(__webpack_require__(3));
	        });

	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  我要下单
	   */
	  .state('orders', {
	    title: '我要下单',
	    url: '/orders',
	    templateUrl: '/dist/page/orders.html',
	    controller: 'OrderCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(3, function (require) {
	          defer.resolve(__webpack_require__(4));
	        });

	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  我要询价
	   */
	  .state('enquiry', {
	    url: '/enquiry',
	    templateUrl: '/dist/page/enquiry.html',
	    controller: 'EnquiryCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(4, function (require) {
	          defer.resolve(__webpack_require__(5));
	        });
	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  物流竞价
	   */
	  .state('bid', {
	    url: '/bid',
	    templateUrl: '/dist/page/bid.html',
	    controller: 'BidCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(5, function (require) {
	          defer.resolve(__webpack_require__(6));
	        });
	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  物流跟踪
	   */
	  .state('track', {
	    url: '/track',
	    templateUrl: '/dist/page/track.html',
	    controller: 'TrackCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(6, function (require) {
	          defer.resolve(__webpack_require__(7));
	        });
	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  服务介绍
	   */
	  .state('service', {
	    url: '/service',
	    templateUrl: '/dist/page/service.html',
	    controller: 'ServiceCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(7, function (require) {
	          defer.resolve(__webpack_require__(8));
	        });
	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  企业信息
	   */
	  .state('enterprises/:id', {
	    url: 'enterpris',
	    templateUrl: '/dist/page/enterpris.html',
	    controller: 'EnterprisCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        __webpack_require__.e/* nsure */(8, function (require) {
	          defer.resolve(__webpack_require__(9));
	        });
	        return defer.promise;
	      }]
	    }
	  })

	  /*
	   *  园区信息
	   */
	  .state('ganders', {
	    url: '/ganders',
	    templateUrl: '/dist/page/ganders.html',
	    controller: 'GandersCtrl',
	    resolve: {
	      loadCtrl: ['$q', function ($q) {
	        var defer = $q.defer();
	        !/* require.ensure */(function (require) {
	          defer.resolve(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../js/controller/gander.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
	        }(__webpack_require__));
	        return defer.promise;
	      }]
	    }
	  });
	}]);

	module.exports = app;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	'use strict';

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/bid.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/enquiry.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/enterprises.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/footer.html', '<section class="jyt-desc">\n' + '    <div>\n' + '        <dl>\n' + '            <dt>线路/运单查询</dt>\n' + '            <dd><a href="#">如何在线查询线路？</a></dd>\n' + '            <dd><a href="#">如何在物流平台下单？</a></dd>\n' + '            <dd><a href="#">首次下单 如何注册？</a></dd>\n' + '            <dd><a href="#">如何委托交易</a></dd>\n' + '            <dd><a href="#">如何自己找货</a></dd>\n' + '        </dl>\n' + '    </div>\n' + '\n' + '    <div>\n' + '        <dl>\n' + '            <dt>物流常识</dt>\n' + '            <dd><a href="#">什么是重货？什么是轻货？</a></dd>\n' + '            <dd><a href="#">什么是最低一票？</a></dd>\n' + '            <dd><a href="#">什么是是签单返还？</a></dd>\n' + '            <dd><a href="#">供应商合作洽谈</a></dd>\n' + '            <dd><a href="#">合作热线</a></dd>\n' + '        </dl>\n' + '    </div>\n' + '\n' + '    <div>\n' + '        <dl>\n' + '            <dt>在线帮助</dt>\n' + '            <dd><a href="#">注册流程</a></dd>\n' + '            <dd><a href="#">无法登录/忘记密码</a></dd>\n' + '            <dd><a href="#">修改账户信息</a></dd>\n' + '        </dl>\n' + '    </div>\n' + '\n' + '    <div>\n' + '        <h3>免费会员咨询热线：</h3>\n' + '        <p>400-6360-888(免长途费)</p>\n' + '        <p>010-80706099</p>\n' + '        <p>传真：010-80706099-9</p>\n' + '        <p>QQ</p>\n' + '    </div>\n' + '\n' + '    <div>\n' + '        <p><img src="" alt=""/></p>\n' + '        <p>扫描聚贸物流平台二维码</p>\n' + '    </div>\n' + '</section>\n' + '\n' + '<div class="footer-b"></div>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/ganders.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/header.html', '<header>头部</header>\n' + '\n' + '<section>\n' + '\n' + '    <h1>LOGO</h1>\n' + '\n' + '    <nav>\n' + '        <ul>\n' + '            <li><a ui-sref-active="active" ui-sref="home">首页</a></li>\n' + '            <li><a ui-sref-active="active" ui-sref="specials">运费特惠</a></li>\n' + '            <li><a ui-sref-active="active" ui-sref="orders">我要下单</a></li>\n' + '            <li><a ui-sref-active="active" ui-sref="enquiry">我要询价</a></li>\n' + '            <li><a ui-sref-active="active" ui-sref="bid">物流竞价</a></li>\n' + '            <li><a ui-sref-active="active" ui-sref="track">物流跟踪</a></li>\n' + '            <li><a ui-sref-active="active" ui-sref="service">服务介绍</a></li>\n' + '        </ul>\n' + '    </nav>\n' + '</section>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/home.html', '<h2>{{ title }}</h2>\n' + '\n' + '<div class="demo"></div>\n' + '<div class="demo2"></div>\n' + '<div class="demo3"></div>\n' + '\n' + '<button ng-click="get()">GET</button>\n' + '<button ng-click="post()">POST</button>\n' + '<button ng-click="batch()">batch</button>\n' + '\n' + '<button ng-click="getBase()">获取基础数据</button>\n' + '\n' + '<button ng-click="getBaseOther()">获取其他基础数据</button>\n' + '\n' + '\n' + '<input type="text" ng-model="date"/>\n' + '<button ng-click="getDate()">获取时间</button>\n' + '\n' + '<p>\n' + '  <input type="text" ng-model="sessionStorage">\n' + '  <button type="button" name="button" ng-click="setSessionStroage()">设置sessionStorage</button>\n' + '  <button type="button" name="button" ng-click="getsessionStroage()">获取sessionStorage</button>\n' + '</p>\n' + '');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/orders.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/service.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/specials.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

	(function (module) {
	  try {
	    module = angular.module('jytApp');
	  } catch (e) {
	    module = angular.module('jytApp', []);
	  }
	  module.run(['$templateCache', function ($templateCache) {
	    $templateCache.put('/dist/page/track.html', '<h2>{{ title }}</h2>');
	  }]);
	})();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by Administrator on 2016/7/4 0004.
	 */
	var app = __webpack_require__(1);

	// 验证用户信息
	app.factory('AuthService', ['$resource', 'SERVER_ADDRESS', function ($resource, SERVER_ADDRESS) {
	  return $resource(SERVER_ADDRESS + '/user/getUserInfo');
	}]);

	// demo
	app.factory('demo', ['$resource', function ($resource) {
	  return $resource('/api/lists');
	}]);

	// Session
	app.factory('SessionService', function () {
	  return {
	    // 存储用户信息
	    user: null,

	    // 创建用户
	    createUser: function createUser(val) {
	      this.user = val;
	    },

	    // 设置用户信息
	    setUser: function setUser(arg, value) {
	      // 传入一个对象
	      if (angular.isObject(arg)) {
	        var _this = this;
	        angular.forEach(arg, function (value, key) {
	          return _this[key] = value;
	        });
	        // 传入一个key 值
	      } else if (angular.isUndefined(arg) && angular.isString(arg) && angular.isUndefined(value)) {
	        angular.isObject(this.user) && (this.user[arg] = value);
	      }
	    },


	    // 删除用户 清空
	    removeUser: function removeUser() {
	      this.user = null;
	    },


	    // 删除用户一个属性
	    removeUserAttr: function removeUserAttr(key) {
	      this.user && delete this.user[key];
	    },


	    // 获取当前用户
	    getUser: function getUser() {
	      return this.user;
	    }
	  };
	});

	// TOKEN 管理
	app.factory('TokenHandler', function () {
	  return {
	    token: '',

	    // 设置TOKEN
	    set: function set(t) {
	      this.token = t;
	    },


	    // 获取TOKEN
	    get: function get() {
	      return this.token || '';
	    },


	    // 删除TOKEN
	    removeToken: function removeToken() {
	      this.token = '';
	    }
	  };
	});

	//  公用API
	app.factory('Public', ['$resource', 'SERVER_ADDRESS', '$q', function ($resource, SERVER_ADDRESS, $q) {
	  return {

	    token: '',

	    // 基础数据
	    base: null,

	    // 验证码
	    Captchas: function Captchas() {
	      return $resource(SERVER_ADDRESS + '/captchas');
	    },


	    // banner
	    Banner: function Banner() {
	      return $resource(SERVER_ADDRESS + '/banners');
	    },


	    // Footers
	    Footer: function Footer() {
	      return $resource(SERVER_ADDRESS + '/footers');
	    },


	    // Token
	    Token: function Token() {
	      return $resource(SERVER_ADDRESS + '/token');
	      // http://192.168.23.218\:8080
	    },


	    // 基础数据
	    Base: function Base() {
	      return $resource(SERVER_ADDRESS + '/base/data');
	    },


	    // 获取基础
	    // 首先在服务中获取 如果
	    // 服务中没有在远程请求数据
	    // 将结果保存到本地服务中
	    // 以便下次请求直接从服务中读取
	    getBase: function getBase(types) {
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
	        this.Base().get({ type: types }, function (data) {
	          defer.resolve(_this.base = angular.extend(getJsonTypes, data.data));
	        });
	      } else {
	        if (angular.isArray(types)) {
	          angular.forEach(types, function (req) {
	            return checkCache(req);
	          });
	        } else if (types && angular.isString(types)) {
	          checkCache(types);
	        }

	        if (!getTypesRequest.length) {
	          return $q.when(getJsonTypes);
	        } else {
	          this.Base().get({ type: getTypesRequest }, function (data) {
	            defer.resolve(_this.base = angular.extend(getJsonTypes, data.data));
	          });
	        }
	      }

	      return defer.promise;
	    },
	    Batch: function Batch() {
	      return $resource(SERVER_ADDRESS + '/__f.do');
	      // return $resource( 'http://192.168.1.51:8080/dove-boy/__f.do');
	    }
	  };
	  //http://192.168.23.205:8888/logistics/account/findOne
	}]);

	// cookie 操作方法
	app.factory('Cookie', function () {
	  return {
	    //简单的设置COOKIE方法
	    //name为cookie的名
	    //val为cookie的值
	    //date为设置过期的时间

	    setCookie: function setCookie(name, val, date) {
	      var oDate = new Date();
	      oDate.setDate(oDate.getDate() + date);
	      var sDate = angular.isUndefined(date) ? "" : ";expires=" + oDate;
	      document.cookie = name + "=" + val + sDate;
	    },


	    //获取COOKIE方法
	    //参数name为cookie的名
	    getCookie: function getCookie(name) {
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
	    delCookie: function delCookie(name) {
	      this.setCookie(name, 'val', -1);
	    },


	    //获取cookies的个数
	    cookieLength: function cookieLength() {
	      var sCookie = document.cookie;
	      if (!sCookie) {
	        return "没有cookie";
	      }
	      var arr = sCookie.split('; ');
	      return arr.length;
	    }
	  };
	});

	app.factory('requestService', function () {
	  return {
	    requests: [],

	    // 清除所有带canCancel参数的请求
	    // 用于路由跳转之后 前一个路由
	    // 还在请求
	    clearAll: function clearAll() {
	      angular.forEach(this.requests, function (req) {
	        return req.resolve();
	      });
	      this.requests = [];
	    }
	  };
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_app2.default.directive('datePick', [function () {
	  return {
	    restrict: 'AE',
	    //  require: ['ngModel'],
	    scope: {},
	    link: function link(scope, element, attrs, ctrls) {
	      console.log();
	    }
	  };
	}]).service('datePickService', [function () {
	  var days = ['日', '一', '二', '三', '四', '五', '六'];
	  var dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	  var currentDate = 0;
	  var sTh = '';

	  days.forEach(function (value) {
	    sTh += '<th>' + value + '</th>';
	  });
	  var html = '<div class="date"><table><thead><tr>' + sTh + '</tr></thead>';

	  function getMonthLastDate(year, month) {
	    return month === 2 ? year % 4 ? 28 : 29 : dates[month - 1];
	  }

	  function createTable(arr) {
	    for (var i = 0, length = arr.length; i < length; i++) {
	      var item = arr[i];

	      if (!(i % 7)) {
	        html += '<tr>';
	      }

	      if (item.currentDate) {
	        html += '<td class="current" data-year="' + item.currentYear + '" data-month="' + item.currentMonth + '" data-date="' + item.date + '">' + item.num + '</td>';
	      } else {
	        html += '<td>' + item.num + '</td>';
	      }

	      if (i % 7 === 6) {
	        html += '</tr>';
	      }
	    }

	    angular.element(document.body).append(html);
	  }

	  this.createDatePick = function (dateTime) {
	    // 获取时间日期
	    var now = new Date(dateTime) || new Date();
	    var fulleYear = now.getFullYear();
	    var month = now.getMonth() + 1;
	    var date = currentDate = now.getDate();
	    var hours = now.getHours();
	    var minutes = now.getMinutes();
	    var second = now.getSeconds();
	    var day = now.getDay();
	    console.log(day);
	    var firstDay = new Date(fulleYear + '/' + month + '/' + 1).getDay();
	    var lastDate = getMonthLastDate(fulleYear, month);
	    var lastDay = new Date(fulleYear + '/' + month + '/' + lastDate).getDay();

	    // 上月
	    var prvMonth = new Date(fulleYear + '/' + (month - 1) + '/1');
	    var prvMonthLastDate = getMonthLastDate(fulleYear, month - 1);
	    // 下月
	    var nextMonth = new Date(fulleYear + '/' + (month + 1) + '/1');
	    var nextMonthLastDate = getMonthLastDate(fulleYear, month + 1);

	    var piukdays = [];
	    // 提取上一个月 要在这个月显示的天数
	    for (var i = 0; i < firstDay; i++) {
	      piukdays.unshift({ num: prvMonthLastDate--, currentMonth: prvMonth.getMonth() + 1, currentYear: prvMonth.getFullYear() });
	    }

	    for (var _i = 1; _i <= lastDate; _i++) {
	      if (_i === date) {
	        piukdays.push({ num: _i, currentDate: true, currentMonth: month, currentYear: fulleYear });
	      } else {
	        piukdays.push({ num: _i, currentMonth: month, currentYear: fulleYear });
	      }
	    }

	    // 提取上一个月 要在这个月显示的天数
	    for (var _i2 = 0; _i2 < 6 - lastDay; _i2++) {
	      piukdays.push({ num: _i2 + 1, month: nextMonth.getMonth() + 1, currentYear: nextMonth.getFullYear() });
	    }
	    createTable(piukdays, lastDay);
	  };

	  this.init = function (config) {
	    this.config = config || {};
	  };
	}]); /**
	      * Created by Administrator on 2016/7/4 0004.
	      */

/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);