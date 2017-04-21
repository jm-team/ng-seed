/*global require, angular*/
(function () {
  "use strict";
  angular
    .module('jmui.dialog', [])
    .service('dialogs', function ($document, $compile, $q, $http, $rootScope, $controller, $animate, $templateCache) {
      /**
       * 弹出框构造函数
       * @author zhoul
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
       * @author zhoul
       * @param   {object}  conf 初始配置对象
       * @returns {object}  promise对象
       */
      Dialogs.prototype.creatHTML = function (conf) {
        var config = conf || {isShowCloseIcon: true};
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
       * [resolve 依赖方法 弹出框依赖的数据在没有得到的时候将不会显示弹出框]
       * @author zhoul
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
       * @author zhoul
       * @param   {string} el     DOM字符串
       * @param   {object} config 配置文件
       * @returns {object} Dom    对象
       */
      Dialogs.prototype.render = function (el, config) {
        var scope = this.scope,
          ctrl,
          prop;
        this.element = angular.element(el);
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
        $animate.enter(this.element, this.container, null, function () {
          // debugger;
        });
        $animate.addClass(this.backdrop, config.backdropClass || '');
      };


      /**
       * 弹出框方法
       * @author zhoul
       * @param   {object} conf 配置对象
       * @returns {object} promise
       */
      Dialogs.prototype.modal = function (conf) {
        var config = conf || {container: document.body, isBackdropClickClose: true};
        var scope = this.scope = $rootScope.$new();
        var defer = $q.defer();
        var self = this;
        var method = config.method;
        var dataElement = null;

        this.config = config;
        this.container = angular.element(config.container);
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
          self.close();
        };

        scope.cancel = function () {
          scope.close();
          defer.reject();
        };
        return defer.promise;
      };


      /**
       * 基础弹出框
       * @author zhoul
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
       * @author zhoul
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
       * @author zhoul
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
      };

      return new Dialogs();
    });
}());
