
var app = require('app');

/**
 * app - 工具函数
 *
 * @return {type}                    description
 */
app.factory('Util', ['$modal', '$sce', '$q', '$location',  function($modal, $sce, $q, $location) {
  var proviceTm = 0;

  return {

    trim: function() {
      if (!String.prototype.trim) {
        return function(value) {
          return angular.isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
        };
      }
      return function(value) {
        return angular.isString(value) ? value.trim() : value;
      };
    },

    /**
     * [getAddrAllByArray description]
     * @return {[type]} [description]
     */
    getAddrAllByArray: function(arr){
      var str = '';
      if(angular.isArray(arr)){
        angular.forEach(arr, function(item){
          str+= item.text;
        })
      }
      return str;
    },

    /**
     * [getLastArray 获取数组最后一个]
     * @param  {[Array]} arr [数组]
     * @return {[type]}     [description]
     */
    getLastArray:function(arr){
      if(angular.isArray(arr) && arr.length > 0){
        return arr[arr.length - 1];
      }else {
        return {};
      }
    },

    getByClassName: function(className, context){
      var re=new RegExp("\\b" + className + "\\b","g");
      var context = context || document.body;
      var aEle = context.getElementsByTagName('*');
      var aResult = [];
      if(!angular.isString(className) || angular.equals('', className)){
        return ;
      }
      for(var i=0;i<aEle.length;i++){
          /*字符串search方法判断是否存在匹配*/
          if(aEle[i].className.search(re) != -1){
              aResult.push(aEle[i]);
          }
      }
      return aResult;

    },

    /**
     * [scrollTop 滚动条滚动到最顶部]
     * @return {[type]} [description]
     */
    scrollTop: function(){
      document.documentElement.scrollTop =  document.body.scrollTop = 0;
    },

    /**
     * [alert 弹出对话框]
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    alert: function(opts){
      return $modal.open({
        templateUrl:'/dist/page/alert.html',
        size :'sm',
        controller: ['$scope', '$modalInstance', '$timeout', function($scope, $modalInstance, $timeout){
          $scope.title =  $sce.trustAsHtml(opts.title || '温馨提示');
          $scope.message = $sce.trustAsHtml(opts.content);

          // 关闭弹出框
          $scope.close = function(){
            $modalInstance && $modalInstance.dismiss('');
          };

          $scope.ok = function(){
            $modalInstance && $modalInstance.close();
          };
          if($modalInstance && opts.timeout){
            $timeout(function(){
              $scope.close();
            }, opts.timeout);
          }
        }]
      });
    },

    /**
     * [search 获取URL字符串中的某个search key]
     * @param  {[type]} str  [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    search: function(str, name){
      var searchs = str.substr(str.indexOf('?')+1).split('&');
      var oSearchs = {};

      angular.forEach(searchs, function(item){
        var _sv = item.split('=');
        oSearchs[_sv[0]] = _sv[1];
      });

      if(angular.isString(name)){
        return oSearchs[name];
      }

      return oSearchs;
    },

    /**
     * [setParmsInRouter 设置路由参数]
     * @param {[type]} search [description]
     */
    setParmsInRouter: function(search){
       var oSearch = angular.extend($location.search(), search);
      for(var attr in oSearch){
        var value = oSearch[attr];
        // 判断自定义属性是否是undefied 或 空值
        if(oSearch.hasOwnProperty(attr) &&
          (angular.equals('pageSize', attr) ||
          angular.isUndefined(value) ||
          angular.equals('', value))){
          delete oSearch[attr];
        }
      }
      $location.search(oSearch);
    },

    /**
     * 创建iframe
     * @param  {[type]} src [description]
     * @return {[type]}     [description]
     */
    createIframe: function(src){

      var iframe = document.getElementById('content_info');
      var now = +new Date();
      var _this = this;
      var oBody = document.body;
      var defer = $q.defer();
      var str = '';

      // if(now - proviceTm < 3000){
      //   proviceTm = now;
      //   defer.reject();
      // }else{
        proviceTm = now;
        if(!iframe){
          iframe = document.createElement('iframe');
        }

        iframe.setAttribute('width', 0);
        iframe.setAttribute('height', 0);
        iframe.style.display = 'none';
        iframe.id = "content_info";
        iframe.src = src;

        if (iframe.attachEvent) {
          iframe.attachEvent('onload',  function(){
            try{
              str = parent.document.getElementById("content_info").contentWindow.location.href;
              str = str.substr(str.indexOf('?')+1);
            } catch(e){

            }

            if(str){
              defer.resolve(_this.search(str, 'shiroJID'));
            }else{
              defer.reject();
            }
            oBody.removeChild(iframe);
            if(angular.isFunction(CollectGarbage)){
              CollectGarbage();
            }
          });
        } else {
          iframe.onload  = function() {
            try{
              str = parent.document.getElementById("content_info").contentWindow.location.href;
              str = str.substr(str.indexOf('?')+1);
            } catch(e){

            }

            if(str){
              defer.resolve(_this.search(str, 'shiroJID'));
            }else{
              defer.reject();
            }

            oBody.removeChild(iframe);
          };
        }
        oBody.appendChild(iframe);
      // }
      return defer.promise;
    },

    /**
     * getStyle - 获取DOM的指令样式
     *
     * @param  {Object} obj      DOM元素
     * @param  {String} attr 指定的样式
     * @return {String}      元素指定样式的值
     */
    getStyle: function(obj, attr){
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return getComputedStyle(obj, false)[attr];
      }
    }
  };
}]);



/**
 * Address - 环境地址配置
 *
 */
app.factory('Address', ['$location', 'SERVER_ADDRESS', '$q', 'USERCENTER_ADDRESS',  function($location, SERVER_ADDRESS, $q, USERCENTER_ADDRESS){
  return {

    localAddress: $location.absUrl(),


    localHost: $location.protocol() +'://'+ $location.host()+':'+$location.port(),

    //用户中心地址
    USERCENTER_ADDRESS: USERCENTER_ADDRESS,

    // API 请求基础地址
    API_ADDRESS: $location.protocol() +'://'+ $location.host()+':'+$location.port() +'/webapi/v1',

    // 获取当前地址
    getLocalAddress: function(){
      return $location.absUrl();
    },

    //获取登录地址
    getLoginAddress: function(){
      return SERVER_ADDRESS + '/webapi/v1/login?successful='+ this.getLocalAddress();
    },

    getLogoutAddress: function(){
      return SERVER_ADDRESS + '/webapi/v1/logout?successful='+ this.getLocalAddress();
    }


  };
}]);


app.factory('Login', ['Address', '$http', function(Address, $http){
  return {
    checkIsRequiredCode: function(data){
      console.log(data);
      return $http.jsonp(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=checkLoginNeedVerifyCode&callback=JSON_CALLBACK', {params:data});
    },

    checkCode: function(data){
      return $http.jsonp(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=validateVerifyCode&callback=JSON_CALLBACK', {params:data});
    }
  }
}])

/**
 * 存储当前用户信息和状态
 * @param  {[type]}          [description]
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */
app.factory('Auth', function() {
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
     * @param {[  ]} value             [ [可选] 当arg是String 用户的值 ]
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
  };
});

/**
 * [Session]
 * @return {[type]}             [description]
 */
app.factory('Session', function() {
  return {

    // 登录的session ID
    shiroJID:'',

    // token 提交表单的时候
    // 需要带上的
    token: '',

    /**
     * [set 设置TOKEN]
     * @param {[ String ]} value [token值]
     */
    setToken: function(value) {
      this.token = value;
    },

    /**
     * [get 获取TOKEN]
     * @return
     */
    getToken: function() {
      return this.token;
    },

    /**
     * [removeToken 删除TOKEN]
     * @return {[type]} [description]
     */
    removeToken: function() {
      this.token = '';
    }
  };
});


/**
 * move - 动画效果
 *
 * @param  {type} 'Move'    description
 * @param  {type} function( description
 * @return {type}           description
 */
app.factory('Move', ['Util', function(Util) {

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
      var s;
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
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },

    //正弦增强曲线（弹动渐出）
    elasticOut: function(t, b, c, d, a, p) {
      var s;
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
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },

    elasticBoth: function(t, b, c, d, a, p) {
      var s;
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
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
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
  };


  /**
   * now - 获取当前时间戳
   *
   * @return
   */
  function now() {
    return (new Date()).getTime();
  }

  /**
   * move - 动画函数
   *
   * @param  {Object} obj    需要动画的DOM元素
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
      if(json.hasOwnProperty(attr)){
        iCur[attr] = 0;
        if (attr == 'opacity') {
          iCur[attr] = Math.round(Util.getStyle(obj, attr) * 100);
        } else if (attr == 'scrollTop') {
          iCur[attr] = obj.scrollTop;
        } else {
          iCur[attr] = parseInt(Util.getStyle(obj, attr));
        }
      }
    }

    var startTime = now();

    clearInterval(obj.timer);

    function scollTodest(cacl, t){
      for (var attr in json) {
        if(json.hasOwnProperty(attr)){
          var value;
          if(cacl){
            value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);
          }else{
            value = json[attr]
          }

          if(!isNaN(value)){
            if (attr == 'opacity') {
              obj.style.opacity = value / 100;
              obj.style.filter = 'alpha(opacity=' + value + ')';
            } else if (attr == 'scrollTop') {
              obj.scrollTop = value;
            } else {
              obj.style[attr] = value + 'px';
            }
          }
        }
      }
    }

    obj.timer = setInterval(function() {

      var changeTime = now();

      var t = times - Math.max(0, startTime - changeTime + times); //0到2000

      scollTodest(1, t)

      if (t == times) {
        clearInterval(obj.timer);
        scollTodest(0, t)
        if (fn) {
          fn.call(obj);
        }
      }

    }, 13);
  }
  return {
    move: move,
    Tween: Tween
  };
}]);



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
  'Address',
  '$q',
  '$modal',
  'DataCache',
  'Session',
  'Util',
  'API',
  'Auth',
  function($resource, Address, $q, $modal, DataCache, Session, Util, API, Auth) {
    return {
      // 面向用户对象
      userTypes: [{ name: '产品', value:1},{ name:'线路', value: 0}],

      // 区域
      area: [{
        optionName:'境外',
        optionCode:0
      },{
        optionName:'境内',
        optionCode:1
      }],

      // 特惠类型
      discountType:[{optionName:'回程车',optionCode:2},{optionName:'线路折扣',optionCode:1}],

      token: '',

      // 基础数据
      base: null,

      // 验证码
      Captchas: function() {
        return $resource(Address.API_ADDRESS + '/captchas');
      },

      // Footers
      Footer: function() {
        return $resource(Address.API_ADDRESS + '/footers');
      },

      // Token
      Token: function() {
         return $resource(Address.API_ADDRESS + '/token');
      },

      // 基础数据
      Base: function() {
        return $resource(Address.API_ADDRESS + '/base/data');
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
            defer.resolve(_this.base =  data.data);
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
              defer.resolve(_this.base = angular.extend(typesCache, data.data));
            });
          }
        }

        return defer.promise;
      },


      // 批量请求数据
      Batch: function() {
        return $resource(Address.API_ADDRESS + '/__f.do');
      },

      loginPop: function(){
        return $modal.open({
            templateUrl: '/dist/page/login.html',
            controller: 'loginCtrl',
            windowClass : 'login-modal'
          });
      },

      // 参与竞拍
      Auction: function(auction){
        // Auth
        var user = Auth.user || {};

        var aErrorMsg = ['待审核', '审核中', '审核通过', '审核不通过', '冻结', '暂停','尚未启用'];

        // 未登录 没有shiroJID
        if(!Session.shiroJID){
          this.loginPop();
          return ;
          // 登录用户是 聚运通需求委托方 不能参与竞拍
        }else if(user.userType === '4'){
          Util.alert({ header:'温馨提示', content:'<p>您是聚运通需求委托方，没有参与竞拍权限！</p>'});
          return ;
        // 判断供应商审核状态
        } else if(user.companyStatus === '2'){
        // } else{
          // 有shiroJID 可以提交表单
          var m =  $modal.open({
            windowClass:'modal-auction',
            templateUrl: '/dist/page/popAuction.html',
            controller: 'popAuctionFormCtrl',
            size: 'lg',
            resolve: {
              auction: function () {
                return auction;
              },

              lines: ['API', '$q', function(API, $q){
                var defer = $q.defer();
                 API.Actives().get({
                  id: auction.id
                }, function(data){
                  var result = data.data;
                  defer.resolve(data.data);
                }, function(data){
                  Util.alert({ header:'温馨提示', content:'<p>线路获取失败， 请关闭弹出框， 重新参与竞拍！</p>'});
                });

                return defer.promise;
              }]
            }
          });

          return m;
        }

        // 供应商审核状态
        if(user.companyStatus !== '2'){
          Util.alert({ header:'温馨提示', content:'<p>您的账号当前为【'+aErrorMsg[Math.floor(user.companyStatus)]+'】，还不能参与竞拍，您可以联系客服解决！</p>'});
        }
      },


      // 下单
      PlaceOrder: function(type, line){
        // Auth
        var user = Auth.user || {};

        var aErrorMsg = ['待审核', '审核中', '审核通过', '审核不通过', '冻结', '暂停','尚未启用'];

        // 没有登陆
        if(!Session.shiroJID){
          this.loginPop();
          return ;
        }else if (user.userType === '3'){
          Util.alert({ header:'温馨提示', content:'<p>您是聚运通物流供应商，没有发布询盘单/竞拍单权限！</p>'});
          return ;
        }else if(user.companyStatus === '2'){
          return $modal.open({
            templateUrl: '/dist/page/popOrderForm.html',
            controller: 'popFormCtrl',
            size: 'lg',
            resolve: {
              type: function () {
                return type;
              },

              line: function(){
                return line;
              }
            }
          });
        }

        // 供应商审核状态
        if(user.companyStatus !== '2'){
          Util.alert({ header:'温馨提示', content:'<p>您的账号当前为【'+aErrorMsg[Math.floor(user.companyStatus)]+'】，还不能下单，您可以联系客服解决！</p>'});
        }
      },

      // QQ
      QQ:{
        uin: "4009903355",
        menu:"yes",
        service: "58",
        sigt: "A7F6FEA02730C988FEE36DB64F785F3A54C7C09A17F3F5F7F5A0D99D31F40D9470345FCF0E8C3A82BE32D44DF0756F079DDD0E554461C89C35D952A64FD713E24C341194F8B7D9E0DA528CA2A6D855D640179D195E5B9158E19EA3A4B68F26539B3EE2CA9A0444109DE7D667D88A9137C84C533DCD79A0E6",
        sigu: "30E5D5233A443AB2451ABEFE35747B57210310B417786713F5F3140EF7C78F43BD4E8F59C00B559B52820290ADA979F49F46E524A229094BDEC889066DC050730608F3CC795C154D"
      },

      // 获取category
      getCategory: function(Id){
        var id = Id || 0;
        var defer;
        // 判断是不是最顶级的类目
        if(DataCache.category[id]){
          return $q.when(DataCache.category[id])
        }else{
          defer = $q.defer();
          id = id?id:undefined;
          API.Category().get({parentCode: id}, function(data){
            DataCache.category[id||0] = data;
            defer.resolve(data);
          });
          return defer.promise;
        }

      }
    };
  }
]);


/**
 * [Area 省市区和港口的一些辅助信息 和数据缓存]
 * @return {[type]}                [description]
 */
app.factory('Area', [function(){
  return {
    //  内河航运
    Innerport: [
      { title:'沿线', en:'alongLine'},
      { title:'省', en:'provice'},
      { title:'港口', en:'port'}
    ],

    // 海运
    Port: [
      {title:'航线', en:'line'},
      { title:'国家/地区', en:'country'},
      { title:'港口', en:'port'}
    ],

    // 省市区
    Area:[
      { title:'省', en:'provice'},
      { title:'市', en:'city'},
      { title:'区/县', en:'area'}
    ],

    // 区域缓存
    AreaData:{},

    // 内河缓存
    InnerportData:{},

    // 海运缓存
    PortData:{}

  };
}]);


/*
  用户中心登录
 */

app.factory('UserLogin', ['$resource ', 'Address', function($resource, Address){
  return $resource(Address.USERCENTER_ADDRESS + '/cas/c/loginController?action=checkLoginNeedVerifyCod&callback=CALLBACK', data, {
    isRequiredCode: { method:'jsonp'}
  });
}]);


/**
 * API - 后台接口
 *
 * @param  {type} '$resource'    [ Angular resource库 ]
 * @param  {[type]} $q             [ Angular 自带promise ]
 * @param  {[type]} SERVER_ADDRESS [ 请求服务IP ]
 * @return {[type]}                [description]
 */
app.factory('API', ['$resource', '$q', 'Address', '$http',  function($resource, $q, Address, $http) {
  return {
    
    /**
     * 获取搜索字符串接口
     * @returns {*}
     */
    GetAddrString: function(){
      return $resource(Address.API_ADDRESS + '/base/input');
    },

    /**
     * 获取搜索的地址信息
     * @param code
     * @returns {*}
     */
    QueryAddrSearch: function(code){
      var defer = $q.defer();
      var data = localStorage.getItem(code);

      if(data){
        return $q.when(data);
      }else{
        this.GetAddrString().get({lineType: code}, function(data){
          localStorage.setItem(code, data.data);
          defer.resolve(data.data)
        });
      }
      return defer.promise;
    },

    /**
     * Lines - 获取线路列表详细
     *
     * @return {type}  description
     */
    Lines: function(){
      return $resource(Address.API_ADDRESS + '/line/:id', {id: '@id'});
    },

    /**
     * Actives - 根据竞拍单获取线路列表
     *
     * @return {type}  description
     */
    Actives: function(){
      return $resource(Address.API_ADDRESS + '/line/actives');
    },

    /**
     * Search - 搜索
     *
     * @return {type}  description
     */
    Search: function(){
      return $resource(Address.API_ADDRESS + '/search');
    },

    /**
     * Logout - 退出登录
     *
     * @return {type}  description
     */
    Logout: function(){
      return $resource(Address.API_ADDRESS + '/logout');
    },

    /**
     * User - 用户
     *
     * @return {type}  description
     */
    User: function(){
      return $resource(Address.API_ADDRESS + '/user');
    },

    /**
     * [Banner 首页banner ]
     *
     * @return { Array }  返回首页banner资源
     */
    Banner: function() {
        return $resource(Address.API_ADDRESS + '/banners');
    },


    /**
     * hotKeyword - 首页热门搜索关键字
     *
     * @return { Array }  返回热门搜索关键字资源
     */
    HotKeyword: function() {
      return $resource('/src/mocks/hotKeyword.json');
    },


    /**
     * capacity - 运力信息
     * @return { Object }  返回运力信息资源
     */
    Capacity: function() {
      return $resource(Address.API_ADDRESS + '/capacity');
    },


    /**
     * stroage - 仓储出租
     *
     * @return { Object }  返回仓储出租资源
     */
    Stroage: function() {
      return $resource(Address.API_ADDRESS + '/stroage');
    },


    /**
     * auction - 竞拍信息
     *
     * @param {Numnber} [checkStatus] [0 待审核   1 审核通过 2 审核不通过]
     * @param {Number} [status] [0 进行中（未开始报价） 1 已达成意向 2 已作废 3 已过期 4 报价中]
     *
     * @return {type}  返回竞拍信息资源
     */
    Auction: function() {
      return $resource(Address.API_ADDRESS + '/auction/:id', {id: '@id'});
    },

    /**
     * logistCompany - 物流企业列表
     *
     * @return {type}
     */
    LogistCompany: function() {
      return $resource(Address.API_ADDRESS + '/logistCompany');
    },

    /**
     * checkDownLoad - 物流企业Sop和价格是否可下载检测
     *
     * @return {type}
     */
    CheckDownload:function(){
      return $resource(Address.API_ADDRESS + '/checkDownLoad');
    },

    // 物流名录各大洲数据
    WlmlAreas: function(){
      return [
        {id:0, name:'中国大陆', area:'china', active:1},
        {id:1, name:'港澳台', area:'hmt', active:0},
        {id:2, name:'欧洲', area:'euro', active:0},
        {id:3, name:'亚洲', area:'asia', active:0},
        {id:4, name:'大洋洲', area:'aust', active:0},
        {id:5, name:'北美洲', area:'na', active:0},
        {id:6, name:'南美洲', area:'sa', active:0},
        {id:7, name:'非洲', area:'afri', active:0}
      ];
    },

    // 物流名录除中国外其他地区静态数据
    WlmlCompanyData: function(){
      // 物流名录假数据
      return {
            hmt:[
              {id:1, name:'香港空运货站有限公司', website:'http://www.hactl.com', logUrl:'/dist/img/company/pic-hmt-1.jpg'},
              {id:2, name:'亚洲货柜物流中心香港有限公司', website:'http://www.atlhk.com', logUrl:'/dist/img/company/pic-hmt-2.jpg'},
              {id:3, name:'长荣国际股份有限公司', website:'http://www.evergreen.com.tw', logUrl:'/dist/img/company/pic-hmt-3.jpg'},
              {id:4, name:'澳门域多利货运有限公司', website:'http://www.vps-logistic.com', logUrl:'/dist/img/company/pic-hmt-4.jpg'}
            ],
            euro:[
                {id:1, name:'马士基航运公司', website:'http://www.maerskline.com', logUrl:'/dist/img/company/pic-euro-1.jpg'},
                {id:2, name:'Damco货运公司', website:'http://www.damco.com', logUrl:'/dist/img/company/pic-euro-2.jpg'},
                {id:3, name:'得斯威丹麦公司', website:'http://dk.dsv.com', logUrl:'/dist/img/company/pic-euro-3.jpg'},
                {id:4, name:'英国Wincanton物流公司', website:'http://www.wincanton.co.uk', logUrl:'/dist/img/company/pic-euro-4.jpg'},
                {id:5, name:'GLS', website:'http://gls-group.eu', logUrl:'/dist/img/company/pic-euro-5.jpg'},
                {id:6, name:'Norbert Dentressangle', website:'http://www.norbert-dentressangle.fr', logUrl:'/dist/img/company/pic-euro-6.jpg'},
                {id:7, name:'德国超捷物流有限公司（Dachser）', website:'http://www.dachser.com', logUrl:'/dist/img/company/pic-euro-7.jpg'}
            ],
            asia:[
                {id:1, name:'日本铁路货运公司', website:'http://www.jrfreight.co.jp', logUrl:'/dist/img/company/pic-asia-1.jpg'},
                {id:2, name:'马尼拉国际集装箱码头', website:'http://www.mictweb.com', logUrl:'/dist/img/company/pic-asia-2.jpg'},
                {id:3, name:'DTDC', website:'http://www.dtdc.in', logUrl:'/dist/img/company/pic-asia-3.jpg'},
                {id:4, name:'Om Logistics Ltd.', website:'http://www.omlogistics.co.in', logUrl:'/dist/img/company/pic-asia-4.jpg'},
                {id:5, name:'日本通运株式会社（Nippon Express）', website:'http://www.nittsu.co.jp', logUrl:'/dist/img/company/pic-asia-5.jpg'},
                {id:6, name:'安得拉邦国家公路运输公司', website:'http://www.apsrtc.gov.in', logUrl:'/dist/img/company/pic-asia-6.jpg'},
                {id:7, name:'日本大和运输公司', website:'http://www.kuronekoyamato.co.jp', logUrl:'/dist/img/company/pic-asia-7.jpg'}
            ],
            aust:[
                // {id:1, name:'澳大利亚TOLL公司', website:'http://www.tollgroup.com', logUrl:'/dist/img/company/pic-aust-1.jpg'},
                {id:2, name:'Dynamic Distribution Systems', website:'http://www.dynamicdistributionsystems.com.au', logUrl:'/dist/img/company/pic-aust-2.jpg'},
                {id:3, name:'Logistics Australia', website:'http://www.logisticsaustralia.org', logUrl:'/dist/img/company/pic-aust-3.jpg'},
                {id:4, name:'AZ Logistic', website:'http://www.azlogistic.net', logUrl:'/dist/img/company/pic-aust-4.jpg'},
                {id:5, name:'环球物流网', website:'http://www.globallogisticsnet.com', logUrl:'/dist/img/company/pic-aust-5.jpg'},
                {id:6, name:'TRACTA TRANZ NZ LTD.', website:'http://www.tractatranz.co.nz', logUrl:'/dist/img/company/pic-aust-6.jpg'},
                {id:7, name:'Dave Hoskin Carriers Ltd.', website:'http://www.hoskincarrierswanganui.co.nz', logUrl:'/dist/img/company/pic-aust-7.jpg'},
                {id:8, name:'Efficient Moving & Storage', website:'http://www.efficientmovers.co.nz', logUrl:'/dist/img/company/pic-aust-8.jpg'}
            ],
            na:[
                {id:1, name:'Amber Road', website:'http://www.amberroad.com', logUrl:'/dist/img/company/pic-na-1.jpg'},
                {id:2, name:'AAE', website:'http://cn.aaeweb.com', logUrl:'/dist/img/company/pic-na-2.jpg'},
                {id:3, name:'美国智傲物流有限公司（Geo Logistics）', website:'http://www.geologistics.com', logUrl:'/dist/img/company/pic-na-3.jpg'},
                {id:4, name:'美国沃纳企业公司', website:'http://www.werner.com', logUrl:'/dist/img/company/pic-na-4.jpg'},
                {id:5, name:'定展航运有限公司', website:'http://www.phoenixintl.com', logUrl:'/dist/img/company/pic-na-5.jpg'}
            ],
            sa:[
              {id:1, name:'Toll Holdings Limited', website:'http://www.tollgroup.com/onetoll', logUrl:'/dist/img/company/pic-sa-1.jpg'},
              {id:2, name:'Penske Truck Leasing Co.,', website:'https://www.penskelogistics.com/south-america/', logUrl:'/dist/img/company/pic-sa-2.jpg'}
            ],
            afri:[
                {id:1, name:'KWE南非公司', website:'http://www.kwe.co.za', logUrl:'/dist/img/company/pic-afri-1.jpg'},
                {id:2, name:'南非航运', website:'https://www.safmarine.com', logUrl:'/dist/img/company/pic-afri-2.jpg'},
                {id:3, name:'尼罗河航运', website:'https://www.niledutch.com', logUrl:'/dist/img/company/pic-afri-3.jpg'}
            ]
      };
    },

    /**
     * footer - 底部信息描述
     *
     * @return {type}  返回底部信息描述资源
     */
    // Footer: function() {
    //   return $resource('/src/mocks/footer.json');
    // },


    /**
     * artner - 合作伙伴
     *
     * @return {type}  返回合作伙伴资源
     */
    Artner: function() {
      return $resource(Address.API_ADDRESS + '/parthners');
    },


    /**
     * special - 运费特惠线路列表
     * @param {Number} [id] [线路ID]
     *
     * @return {type}  返回运费特惠线路列表资源
     */
    Special: function() {
      return $resource(Address.API_ADDRESS + '/special/:id', {id: '@id'});
    },


    /**
     * Enquiry - 我要询价线路列表
     *
     * @return {type}  description
     */
    Enquiry: function(){
      return $resource(Address.API_ADDRESS+'/lineRouter');
    },


    /**
     * Area - 获取省市区
     *
     * @return {type}  description
     */
    Area: function(){
      return $resource(Address.API_ADDRESS +'/base/area');
    },


    /**
     * Port - 获取港口
     *
     * @return {type}  description
     */
    Port: function(){
      return $resource(Address.API_ADDRESS + '/base/port');
    },


    /**
     * Innerport - 内河港口
     *
     * @return {type}  description
     */
    Innerport: function(){
      return $resource(Address.API_ADDRESS + '/base/innerport');
    },


    /**
     * Category - 商品类型
     *
     * @return {type}  description
     */
    Category: function(){
      return $resource(Address.API_ADDRESS + '/base/category');
    },


    /**
     * createNeed - 下单 询盘单 快速下单 竞价单
     *
     * @return {type}  description
     */
    need: function(){
      return $resource(Address.API_ADDRESS + '/needs')
    },


    /**
     * offer - 参与竞价
     *
     * @return {type}  description
     */
    Offer: function(){
      return $resource(Address.API_ADDRESS + '/offer')
    },

    // 海运指南-海运航线地图数据
    HYMapPics:[
        {bigurl:'/dist/img/service/dt-pic1.jpg', url:'/dist/img/service/dt-small-pic1.jpg', title:'地中海航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic2.jpg', url:'/dist/img/service/dt-small-pic2.jpg', title:'欧洲航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic3.jpg', url:'/dist/img/service/dt-small-pic3.jpg', title:'韩国航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic4.jpg', url:'/dist/img/service/dt-small-pic4.jpg', title:'波斯湾航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic5.jpg', url:'/dist/img/service/dt-small-pic5.jpg', title:'东南亚航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic6.jpg', url:'/dist/img/service/dt-small-pic6.jpg', title:'日本航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic7.jpg', url:'/dist/img/service/dt-small-pic7.jpg', title:'非洲航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic8.jpg', url:'/dist/img/service/dt-small-pic8.jpg', title:'澳新航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic9.jpg', url:'/dist/img/service/dt-small-pic9.jpg', title:'南美航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic10.jpg', url:'/dist/img/service/dt-small-pic10.jpg', title:'美西航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic11.jpg', url:'/dist/img/service/dt-small-pic11.jpg', title:'美东航线诸港图'},
        {bigurl:'/dist/img/service/dt-pic12.jpg', url:'/dist/img/service/dt-small-pic12.jpg', title:'中美洲航线诸港图'}
    ],

    // 各国在中国大使馆名录
    Embassy: function () {
      return require('json!../../mocks/embassy.json');
    },

    // 国际贸易术语解释通则（2010）
    TradeTerms: [
    {
      open: true,
      title:'EXW——工厂交货（……指定地点）',
      content: '本条规则与（当事人）所选择的运输模式无关，即便（当事人）选择多种运输模式，亦可适用该规则。本规则较适用于国内交易，对于国际交易，则应选FCA[1] “货交承运人（……指定地点）”规则为佳。'
      +'“工厂交货（---指定地点）”是指当卖方在其所在地或其他指定的地点（如工场（强调生产制造场所）、工厂（制造场所）或仓库等）将货物交给买方处置时，即完成交货。卖方不需将货物装上任何运输工具，在需要办理出口清关手续时，卖方亦不必为货物办理出口清关手续。'
      +'双方都应该尽可能明确的指定货物交付地点，因为此时（交付前的）费用与风险由卖方承担。买方必须承当在双方约定的地点或在指定地受领货物的全部费用和风险。'
      +'EXW 是卖方承担责任最小的术语。它应遵守以下使用规则：'
      +'卖方没有义务为买方装载货物，即使在实际中由卖方装载货物可能更方便。若由卖方装载货物，相关风险和费用亦由买方承担。如果卖方在装载货物中处于优势地位，则使用由卖方承担装载费用与风险的FCA术语通常更合适。'
      +'买方在与卖方使用EXW术语时应知晓，卖方仅在买方要求（更符合术语特质）办理出口手续时负有协助的义务：（但是），卖方并无义务主动（更强调最小义务，吸收进2010年本身的意义）办理出口清关手续。因此如果买方不能直接或间接地办理出口清关手续，建议买方不要使用EXW术语。'
      +'买方承担向卖方提供关于货物出口之信息的有限义务。但是，卖方可能需要这些用作诸如纳税（申报税款）、报关等目的的信息。'
    },
    {
      open: null,
      title:'FCA——货交承运人（……指定地点）',
      content: '该项规则可以适用于各种运输方式（单独使用的情况），也可以适用于多种运输方式同时使用的情况。'
      +'“货交承运人”是指卖方于其所在地或其他指定地点将货物交付给承运人或买方指定人。建议当事人最好尽可能清楚地明确说明指定交货的具体点，风险将在此点转移至买方。'
      +'若当事人意图在卖方所在地交付货物，则应当确定该所在地的地址，即指定交货地点。另一方面，若当事人意图在其他地点交付货物，则应当明确确定一个不同的具体交货地点。'
      +'FCA要求卖方在需要时办理出口清关手续。但是，卖方没有办理进口清关手续的义务，也无需缴纳任何进口关税或者办理其他进口海关手续。'
      +'在需要办理海关手续时（在必要时/适当时），DAP规则要求应有卖方办理货物的出口清关手续，但卖方没有义务办理货物的进口清关手续，支付任何进口税或者办理任何进口海关手续，如果当事人希望卖方办理货物的进口清关手续，支付任何进口税和办理任何进口海关手续，则应适用DDP规则 '
    },
    {
      open: null,
      title:'CPT——运费付至（……指定目的港）',
      content: '这一术语无例外地用于所选择的任何一种运输方式以及运用多种运输方式的情况。'
      +'“运费付至…”指卖方在指定交货地向承运人或由其(卖方)指定的其他人交货并且其（卖方）须与承运人订立运输合同，载明并实际承担将货物运送至指定目的地的所产生的必要费用.'
      +'在CPT, CIP, CFR, or CIF适用的情形下，卖方的交货义务在将货物交付承运人，而非货物到达指定目的地时，即告完全履行。'
      +'此规则有两个关键点，因为风险和成本在不同的地方发生转移。买卖双方当事人应在买卖合同中尽可能准确地确定以下两个点：发生转移至买方的交货地点;在其须订立的运输合同中载明的指定目的地。如果使用多个承运人将货物运至指定目的地，且买卖双方并未对具体交货地点有所约定，则合同默认风险自货物由买方交给第一承运人时转移，卖方对这一交货地点的选取具有排除买方控制的绝对选择权。如果当事方希望风险转移推迟至稍后的地点发生'
      +'（例如：某海港或机场），那么他们需要在买卖合同中明确约定这一点。'
      +'由于将货物运至指定目的地的费用由卖方承担，因而当事人应尽可能准确地确定目的地中的具体地点。且卖方须在运输合同中载明这一具体的交货地点。卖方基于其运输合同中在指定目的地卸货时，如果产生了相关费用，卖方无权向买方索要，除非双方有其他约定。'
      +'CPT贸易术语要求卖方，在需要办理这些手续时，办理货物出口清关手续。但是，卖方没有义务办理货物进口清关手续、支付进口关税以及办理任何进口所需的任何海关手续。'
    },
    {
      open: null,
      title:'CIP——运费和保险费付至（……指定目的地）',
      content: '该术语可适用于各种运输方式，也可以用于使用两种以上的运输方式时。'
      +'“运费和保险费付至”含义是在约定的地方（如果该地在双方间达成一致）卖方向承运人或是卖方指定的另一个人发货，以及卖方必须签订合同和支付将货物运至目的地的运费。'
      +'卖方还必须订立保险合同以防买方货物在运输途中灭失或损坏风险。买方应注意到CIP（运费和保险费付至指定目的地）术语只要求卖方投保最低限度的保险险别。如买方需要更多的保险保障，则需要与卖方明确地达成协议，或者自行作出额外的保险安排。'
      +'在CPT，CIP，CFR和CIF在这些术语下，当卖方将货物交付与承运人时而不是货物到达目的地时，卖方已经完成其交货义务。'
      +'由于风险和费用因地点之不同而转移，本规则有两个关键点。买卖双方最好在合同中尽可能精确地确认交货地点，风险转移至买方地，以及卖方必须订立运输合同所到达的指定目的地。若将货物运输至约定目的地用到若干承运人而买卖双方未就具体交货点达成一致，则默认为风险自货物于某一交货点被交付至第一承运人时转移，该交货点完全由卖方选择而买方无权控制。如果买卖双方希望风险在之后的某一阶段转移（例如在一个海港或一个机场），'
      +'则他们需要在其买卖合同中明确之。'
      +'将货物运输至具体交货地点的费用由卖方承担，因此双方最好尽可能明确在约定的目的地的具体交货地点。卖方最好制定与此次交易精确匹配的的运输合同。如果卖方按照运输合同在指定的目的地卸货而支付费用，除非双方另有约定，卖方无权向买方追讨费用。'
      +'CIP术语要求卖方在必要时办理货物出口清关手续。但是，卖方不承担办理货物进口清关手续，支付任何进口关税，或者履行任何进口报关手续的义务。'
    },
    {
      open: null,
      title:'DAT——终点站交货（……指定目的港或目的地）',
      content: '此规则可用于选择的各种运输方式，也适用于选择的一个以上的运输方式。'
      +'“终点站交货”是指，卖方在指定的目的港或目的地的指定的终点站卸货后将货物交给买方处置即完成交货。“终点站”包括任何地方，无论约定或者不约定，包括码头，仓库，集装箱堆场或公路，铁路或空运货站。卖方应承担将货物运至指定的目的地和卸货所产生的一切风险和费用。'
      +'建议当事人尽量明确地指定终点站，如果可能，（指定）在约定的目的港或目的地的终点站内的一个特定地点，因为（货物）到达这一地点的风险是由卖方承担建议卖方签订一份与这样一种选择准确契合的运输合同。'
      +'此外，若当事人希望卖方承担从终点站到另一地点的运输及管理货物所产生的风险和费用，那么此时DAP（目的地交货）或DDP（完税后交货）规则应该被适用。'
      +'在必要的情况下，DAT规则要求卖方办理货物出口清关手续。但是，卖方没有义务办理货物进口清关手续并支付任何进口税或办理任何进口报关手续。'
    },
    {
      open: null,
      title:'DAP——目的地交货（……指定目的地）',
      content: 'DAP是《国际贸易术语解释通则2010》新添加的术语，取代了的DAF[2]（边境交货）、DES[3]（目的港船上交货）和DDU[4]（未完税交货）三个术语。'
      +'该规则的适用不考虑所选用的运输方式的种类，同时在选用的运输方式不止一种的情形下也能适用。'
      +'目的地交货的意思是：卖方在指定的交货地点，将仍处于交货的运输工具上尚未卸下的货物交给买方处置即完成交货。卖方须承担货物运至指定目的地的一切风险。'
      +'尽管卖方承担货物到达目的地前的风险，该规则仍建议双方将合意交货目的地指定尽量明确。建议卖方签订恰好匹配该种选择的运输合同。如果卖方按照运输合同承受了货物在目的地的卸货费用，那么除非双方达成一致，卖方无权向买方追讨该笔费用。'
      +'在需要办理海关手续时（在必要时/适当时），DAP规则要求应有卖方办理货物的出口清关手续，但卖方没有义务办理货物的进口清关手续，支付任何进口税或者办理任何进口海关手续，如果当事人希望卖方办理货物的进口清关手续，支付任何进口税和办理任何进口海关手续，则应适用DDP规则 '
    },
    {
      open: null,
      title:'DDP——完税后交货（……指定目的地）',
      content: '这条规则可以适用于任何一种运输方式，也可以适用于同时采用多种运输方式的情况。'
      +'“完税后交货”是指卖方在指定的目的地，将货物交给买方处置，并办理进口清关手续，准备好将在交货运输工具上的货物卸下交与买方，完成交货。卖方承担将货物运至指定的目的地的一切风险和费用，并有义务办理出口清关手续与进口清关手续，对进出口活动负责，以及办理一切海关手续。'
      +'DDP术语下卖方承担最大责任。'
      +'因为到达指定地点过程中的费用和风险都由卖方承担，建议当事人尽可能明确地指定目的地。建议卖方在签订的运输合同中也正好符合上述选择的地点。如果卖方致使在目的地卸载货物的成本低于运输合同的约定，则卖方无权收回成本，当事人之间另有约定的除外。'
      +'如果卖方不能直接或间接地取得进口许可，不建议当事人使用DDP术语。'
      +'如果当事方希望买方承担进口的所有风险和费用，应使用DAP术语。'
      +'任何增值税或其他进口时需要支付的税项由卖方承担，合同另有约定的除外。'
    },
    {
      open: null,
      title:'FAS——船边交货（……指定装运港）',
      content: '这项规则仅适用于海运和内河运输'
      +'“船边交货”是指卖方在指定装运港将货物交到买方指定的船边（例如码头上或驳船上），即完成交货。从那时起，货物灭失或损坏的风险发生转移，并且由买方承担所有费用。'
      +'当事方应当尽可能明确的在指定装运港指定出装货地点，这是因为到这一地点的费用与风险由卖方承担，并且根据港口交付惯例这些费用及相关的手续费可能会发生变化。'
      +'卖方在船边交付货物或者获得已经交付装运的货物。这里所谓的“获得”迎合了链式销售，在商品贸易中十分普遍。'
      +'当货物通过集装箱运输时，卖方通常在终点站将货物交给承运人，而不是在船边。在这种情况下，船边交货规则不适用，而应当适用货交承运人规则。'
      +'船边交货规则要求卖方在需要时办理货物出口清关手续。但是，卖方没有任何义务办理货物进口清关、支付任何进口税或者办理任何进口海关手续。'
    },
    {
      open: null,
      title:'FOB——船上交货（……指定装运港）',
      content: '本规则只适用于海运或内河运输。'
      +'“船上交货”是指卖方在指定的装运港，将货物交致买方指定的船只上，或者指（中间销售商）设法获取这样交付的货物。一旦装船，买方将承担货物灭失或损坏造成的所有风险。'
      +'卖方被要求将货物交至船只上或者获得已经这样交付装运的货物。这里所谓的“获得”迎合了连是销售，在商品贸易中十分普遍。'
      +'FOB不适用于货物在装船前移交给承运人的情形。比如，货物通过集装箱运输，并通常在目的地交付。在这些情形下，适用FCA的规则。'
      +'在适用FOB时，销售商负责办理货物出口清关手续。但销售商无义务办理货物进口清关手续、缴纳进口关税或是办理任何进口报关手续 '
    },
    {
      open: null,
      title:'CFR——成本加运费付至（……指定目的港）',
      content: '本规定只适用于海路及内陆水运。'
      +'“成本加运费”是指卖方交付货物于船舶之上或采购已如此交付的货物，而货物损毁或灭失之风险从货物转移至船舶之上起转移，卖方应当承担并支付必要的成本加运费以使货物运送至目的港。'
      +'当使用CPT,CIP,CFR或CIF术语时，卖方在将货物交至已选定运输方式的运送者时，其义务即已履行，而非货物抵达目的地时方才履行。'
      +'本规则有两个关键点，因为风险转移地和运输成本的转移地是不同的。尽管合同中通常会确认一个目的港，而不一定确认却未必指定装运港，即风险转移给买方的地方。如果买方对装运港关乎买方的特殊利益（特别感兴趣），建议双方就此在合同中尽可能精确的加以确认。'
      +'建议双方对于目的港的问题尽可能准确确认，因为以此产生的成本加运费由卖方承担。订立与此项选择（目的港选择）精确相符的运输合同。如果因买方原因致使运输合同与卸货点基于目的港发生关系，那么除非双方达成一致，否则卖方无权从买方处收回这些费用。'
      +'成本加运费对于货物在装到船舶之上前即已交给（原为交付）承运人的情形可能不适用，例如通常在终点站（即抵达港、卸货点，区别于port of destination）交付的集装箱货物。在这种情况下，宜使用CPT规则。（如当事各方无意越过船舷交货 ）'
      +'成本加运费原则要求卖方办理出口清关手续，若合适的话。但是，卖方无义务为货物办理进口清关、支付进口关税或者完成任何进口地海关的报关手续。'
    },
    {
      open: null,
      title:'CIF——成本，保险加运费付至（……指定目的港）',
      content: '该术语仅适用于海运和内河运输。'
      +'“成本，保险费加运费”指卖方将货物装上船或指（中间销售商）设法获取这样交付的商品。货物灭失或损坏的风险在货物于装运港装船时转移向买方。卖方须自行订立运输合同，支付将货物装运至指定目的港所需的运费和费用。'
      +'卖方须订立货物在运输途中由买方承担的货物灭失或损坏风险的保险合同。买方须知晓在CIF规则下卖方有义务投保的险别仅是最低保险险别。如买方望得到更为充分的保险保障，则需与卖方明确地达成协议或者自行做出额外的保险安排。'
      +'当CPT，CIP， CFR或者 CIF术语被适用时，卖方须在向承运方移交货物之时而非在货物抵达目的地时，履行已选择的术语相应规范的运输义务。'
      +'此规则因风险和费用分别于不同地点转移而具有以下两个关键点。合同惯常会指定相应的目的港，但可能不会进一步详细指明装运港，即风险向买方转移的地点。如买方对装运港尤为关注，那么合同双方最好在合同中尽可能精确地确定装运港。'
      +'当事人最好尽可能确定在约定的目的港内的交货地点，卖方承担至交货地点的费用。当事人应当在约定的目的地港口尽可能精准地检验，而由卖方承担检验费用。卖方应当签订确切适合的运输合同。如果卖方发生了运输合同之下的于指定目的港卸货费用，则卖方无需为买方支付该费用，除非当事人之间约定。'
      +'卖方必须将货物送至船上或者（由中间销售商）承接已经交付的货物并运送到目的地。除此之外，卖方必须签订一个运输合同或者提供这类的协议。这里的“提供”是为一系列的多项贸易过程（“连锁贸易”）服务，尤其在商品贸易中很普遍。'
      +'CIF术语并不适用于货物在装上船以前就转交给承运人的情况，例如通常运到终点站交货的集装箱货物。在这样的情况下，应当适用CIP术语。'
      +'“成本、保险费加运费”术语要求卖方在适用的情况下办理货物出口清关手续。然而，卖方没有义务办理货物进口清关手续，缴纳任何进口关税或办理进口海关手续。'
    }
  ]
  };
}]);

/**
 * dataCacha - 数据缓存
 *
 * @param  {type} 'dataCacha'    数据缓存 存储一些不经常改变的数据
 * @param  {type} function( description
 * @return {type}           description
 */
app.factory('DataCache', [
  function() {
    return {
      category:{}
    };
  }
]);

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
     * @param {[type]} path [ cookie的路径 ]
     * @param {[type]} date [ 过期的时间 ]
     */
    setCookie: function(name, val, path, date) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + date);
      var sDate = angular.isUndefined(date) ? "" : ";expires=" + oDate +';path='+(path?path:'/');
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
      this.setCookie(name, '', '/', -1);
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
  };
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
      });
      this.requests = [];
    }
  };
});
