var app = require('app');

//Address - 环境地址配置
app.factory('Address', function ($location, SERVER_ADDRESS, $q, USERCENTER_ADDRESS) {
  return {

    localAddress: $location.absUrl(),


    localHost: $location.protocol() + '://' + $location.host() + ':' + $location.port(),

    //用户中心地址
    USERCENTER_ADDRESS: USERCENTER_ADDRESS,

    // API 请求基础地址
    API_ADDRESS: $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/webapi/v1',

    // 获取当前地址
    getLocalAddress: function () {
      return $location.absUrl();
    },

    //获取登录地址
    getLoginAddress: function () {
      return SERVER_ADDRESS + '/webapi/v1/login?successful=' + this.getLocalAddress();
    },

    getLogoutAddress: function () {
      return SERVER_ADDRESS + '/webapi/v1/logout?successful=' + this.getLocalAddress();
    }
  };
});


// 登录相关
app.factory('Auth', function ($resource, $document, $q, $timeout, Address) {
  return {
    /**
     * 获取非对称加密的数据接口
     * @author zhoul
     * @returns resource
     */
    security: function () {
      return $resource(Address.API_ADDRESS + '/security');
    },

    /**
     * 用户登录接口
     * @author zhoul
     * @returns resource
     */
    auth: function () {
      return $resource(Address.API_ADDRESS + '/doLogin');
    },

    /**
     * 判断用户是否登录
     * @author zhoul
     * @param opt {Object}  可选的参数对象
     * @returns promise
     */
    isLogin: function (opt) {
      var options = angular.extend({}, opt);
      var defer = $q.defer();
      var $ = angular.element;

      // 用户已经登录回调
      window.userLoginSuccessCallback = function (token) {
        oScript.remove();
        defer.resolve(token);
      };

      // 用户未登录回调
      window.userNotLoginCallback = function () {
        oScript.remove();
        defer.reject({
          error: 'ERROR'
        });
      };

      var oScript = $(document.createElement('script'));
      oScript.attr({
        src: options.src,
        id: 'hasLogin'
      });
      $document.find('#hasLogin').remove();
      $document.find('body').append(oScript);
      return defer.promise;
    },

    /**
     * 使用表单提交登录处理逻辑
     * @author zhoul
     * @returns promise
     */
    submit: function (form, options) {
      var defer = $q.defer();
      var str = '';
      var iframe = angular.element('<iframe></iframe>');
      var $body = $document.find('body');
      var iframeName = options.iframeName || 'loginIframe';


      $body.append(iframe.attr({
        name: iframeName,
        id: iframeName
      }).css({
        display: 'none'
      }));

      angular.element(form).attr({
        action: options.action,
        target: iframeName
      });


      // 表单提交成功结果
      iframe.on('load', function () {
        try {
          str = parent.document.getElementById(iframeName).contentWindow.document.body.innerHTML;
          defer.resolve(angular.fromJson(str));
        } catch (e) {
          defer.reject();
        }
        iframe.remove();
      });

      iframe.on('error', function () {
        iframe.remove();
      });

      // 使用延时 解决密码做加密后 model同步缓慢 提交的密码是非加密的密码
      $timeout(function () {
        form.submit();
      }, 0);
      return defer.promise;
    }
  }
});

// 用户相关
app.factory('User', function () {
  return {
    user: {},
    setUser: function (user) {
      angular.extend(this.user, user);
    }
  }
});

// 静态资源引用（webpack 非HTML属性中）
app.factory('Static', function () {
  return {
    defaultImage: require("../asset/img/logo.png")
  }
});
