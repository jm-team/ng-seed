/*global require, angular*/

/**
 * [dialog 弹窗服务]
 *
 * @author zhoul
 * @description
 * dialog 弹窗服务
 * 
 * 方法：
 *  confirm： 确认框
 *  alert:    确定框
 *  modal:    自定义弹窗
 * 
 * 弹框参数：
 *  title：弹出标题模板
 *  template： 显示模板
 *  templateUrl: 模板地址
 *  className： 弹出类名
 *  backdropClass：遮罩层类名
 *  success： 用户自定义模板的时候点击确定 请求某个服务端接口 成功执行的回调
 *  error： 用户自定义模板的时候点击确定 请求某个服务端接口 失败执行的回调
 *  resolves： 弹出之前需要处理的一些依赖
 *  controllerAs：用于支持as语法
 *  controller: 用户自定义模板的时候 可以添加控制器 处理自定义的模板
 *  container：弹窗组append的DOM
 *  locals：一些数据可在自定义模板的控制器中依赖注入
 * 
 * @example
 * 确认框
 * dialogs.confirm({
 *    template: '<p class="text-center text-default">确认删除？</p>'
 * })
 * .then(function () {
 *    alert("您点了确认");
 *    dialogs.close();
 * }, function(){
 *    alert("您点了取消");
 *    dialogs.close();
 * });
 *
 * @example
 * 确定框
 * dialogs.alert({
 *    template: '<p class="text-center text-default">确认删除？</p>'
 * })
 * .then(function(){
 *    dialogs.close();
 * })
 * 
 * @example
 * 自定义弹窗
 * dialogs.modal({
 *  method: 'login',
 *  className: 'login-from',
 *  backdropClass: 'in',
 *  templateUrl: loginV2Tmp,
 *  success: function (data) {
 *    var result = data.data.data;
 *    alert('tick')
 *  },
 *  controller: 'loginCtrl'
 * })
 */
angular
  .module('jmui.dialog', [])
  .service('dialogs', function ($document, $compile, $q, $http, $rootScope, $controller, $animate, $templateCache) {
    /**
     * 弹出框构造函数
     * @description 一个弹出框服务用于模拟window的alert、confirm 以及自定义模版的弹出框
     * @class Dialogs
     */
    function Dialogs() {
      this.resolveKeys = [];
      this.scope = {};
      this.locals = {};
      this.element = null;
      this.resolves = [];
      this.controllerName = '';
    }


    /**
     * 创建模版
     * @param   {object}  config 初始配置
     * @returns {object} promise对象
     */
    Dialogs.prototype.creatHTML = function (config) {
      var header = '',
        footer = '',
        template = '<div class="dialog-content">' + (config.template) + '</div>',
        templateUrl = config.templateUrl,
        defer = $q.defer(),
        backdrop = angular.element('<div class="dialog-wrap" ng-click="DropCloseDialogs($event)"></div>'),
        dialogBox = angular.element('<div ng-click="$event.stopPropagation()" class="dialog ' + config.className + '">' + (config.isShowCloseIcon ? '<i ng-click="close($event)" class="dialog-icon-close">&times;</i></div></div>' : ''));

      this.backdrop = angular.element('<div class="modal-backdrop"></div>');

      if (config.dialogHeader) {
        header = '<div class="dialog-header">' + config.dialogHeader + '</div>';
      }

      if (config.dialogFooter) {
        footer = '<div class="dialog-footer">' + config.dialogFooter + '</div>';
      }
      if (templateUrl) {
        $http.get(templateUrl, {
          cache: $templateCache
        }).then(function (response) {
          defer.resolve(backdrop.append(dialogBox.append(response.data)));
        });
      } else {
        return $q.when(backdrop.append(dialogBox.append((header + template + footer))));
      }
      return defer.promise;
    };

    /**
     * 依赖方法 弹出框依赖的数据在没有得到的时候将不会显示弹出
     * @param   {object} config 配置对象
     * @returns {object} promise 对象
     */
    Dialogs.prototype.resolve = function (config) {
      var resolves = config.resolve,
        attr;

      if (angular.isObject(resolves)) {

        for (attr in resolves) {
          if (resolves.hasOwnProperty(attr)) {
            this.resolveKeys.push(attr);
            this.resolves.push(config.resolve[attr]());
          }
        }
      }
      return $q.all(this.resolves);
    };


    /**
     * 编译模版并添加到指定的Dom中
     * @param   {object} data   传入到弹出框中的数据对象
     * @param   {object} config 配置文件
     * @returns {object} Dom    对象
     */
    Dialogs.prototype.render = function (data, config) {
      var scope = this.scope,
        ctrl,
        prop;

      this.element = angular.element(data);

      if (this.controllerName) {
        this.locals.$scope = scope;
        ctrl = $controller(this.controllerName, this.locals);
        if (this.controllerAs) {
          scope[this.controllerAs] = ctrl;
        } else if (this.locals) {
          for (prop in this.locals) {
            if (this.locals.hasOwnProperty(prop)) {
              scope[prop] = this.locals[prop];
            }
          }
        }
      }
      $compile(this.element)(scope);
      $animate.enter(this.element, this.container);
      $animate.addClass(this.backdrop, config.backdropClass || '');
    };


    /**
     * 弹出框方法
     * @param   {object} conf 配置对象
     * @returns {object} promise
     */
    Dialogs.prototype.modal = function (conf) {
      var config = conf || {};
      var scope = this.scope = $rootScope.$new(true);

      console.log(scope);

      var defer = $q.defer();
      var self = this;
      var method = config.method;
      var dataElement = null;

      this.config = config;
      this.container = angular.element(config.container || document.body);
      this.controllerAs = config.controllerAs;
      this.controllerName = config.controller || null;
      this.locals = config.locals || {};
      this.success = config.success || angular.noop;
      this.error = config.error || angular.noop;

      this.resolve(config).then(function (data) {
        angular.forEach(data, function (item, index) {
          scope[self.resolveKeys[index]] = item;
        });
        return self.creatHTML(config);
      }).then(function (data) {
        dataElement = data;
        self.container.append(self.backdrop);
        self.render(data, config);
      });

      scope.ok = function ($event) {
        // 判断controller中点击ok后是否需要进一步处理异步操作(如: 登录)
        // 如果是将会处理这个请求服务之后返回promise对象
        // 以便dialogs.model() 能正常使用then 方法处理请求后的操作
        // 执行操作处理函数是通过config.method 传入处理函数的名称字符串
        // 然后找到controller中对应的处理函数执行
        if (angular.isFunction(scope[method])) {
          scope[method]($event).then(function (data) {
            self.success({
              scope: scope,
              data: data
            });
            defer.resolve({
              scope: scope,
              data: data
            });
          }, function (err) {
            self.error({
              scope: scope,
              err: err
            });
            defer.reject({
              scope: scope,
              err: err
            });
          });
        } else {
          defer.resolve(scope);
        }
      };

      scope.DropCloseDialogs = function () {
        if (angular.isUndefined(config.isBackdropClickClose) || config.isBackdropClickClose) {
          scope.close();
        }
      };

      scope.close = function () {
        scope.cancel();
      };

      scope.cancel = function () {
        self.close();
        defer.reject();
      };
      return defer.promise;
    };


    /**
     * 基础弹出框
     * @param   {object} confg 弹出框配置
     * @returns {object} promise
     */
    Dialogs.prototype.alert = function (confg) {
      var config = confg || {};
      var cof = angular.extend(config, {
        dialogHeader: '<h3 class="dialog-title">' + (config.title || '温馨提示') + '</h3>',
        dialogFooter: '<button class="jm-btn jm-btn-sm jm-btn-primary " ng-click="ok($event)">确定</button>'
      });
      return this.modal(cof);
    };

    /**
     * 确认弹出框
     * @param   {object} confg 配置对象
     * @returns {object} promise
     */
    Dialogs.prototype.confirm = function (confg) {
      var config = confg || {};
      var cof = angular.extend(config, {
        dialogHeader: '<h3 class="dialog-title">' + (config.title || '温馨提示') + '</h3>',
        dialogFooter: '<button class="jm-btn jm-btn-sm jm-btn-primary " ng-click="ok($event)">确定</button><button class="jm-btn jm-btn-sm jm-btn-primary " ng-click="cancel($event)">取消</button>'
      });
      return this.modal(cof);
    };


    /**
     * 关闭弹框方法
     * @returns {Dialogs}
     */
    Dialogs.prototype.close = function () {
      if (this.backdrop && angular.isFunction(this.backdrop.remove)) {
        $animate.removeClass(this.backdrop, this.config.backdropClass, function () {
          this.backdrop.remove();
          this.backdrop = null;
        }.bind(this));
      }

      if (this.element && angular.isFunction(this.element.remove)) {
        $animate.leave(this.element, function () {
          this.element = null;
          this.scope.$destroy();
        }.bind(this));
      }
      return this;
    };

    return new Dialogs();
  });
