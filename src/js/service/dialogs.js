// module
var app = require('../app');

function Dialogs(){
  this.resolveKeys = [];
  this.scope = {};
  this.locals = {};
  this.element = null;
  this.resolves = [];
  this.controllerName = '';
}

/**
 * [creatHTML 创建模版]
 * @param  {[Object]} config  [初始配置]
 * @return {[Promise]}        [description]
 */
Dialogs.prototype.creatHTML = function(config){
  var header = '';
  var footer = '';
  var _template = '<div class="dialog-content">' + (config.template)+'</div>';
  var _templateUrl = config.templateUrl;
  var templateCache = this.$templateCache;
  var q = this.$q;
  var defer = q.defer();

  if(config.dialogHeader){
    header = '<div class="dialog-header">'+config.dialogHeader+'</div>';
  }

  if(config.dialogFooter){
    footer = '<div class="dialog-footer">'+config.dialogFooter+'</div>';
  }

  if(_templateUrl){
    http.get(_templateUrl, {
      cache: templateCache
    }).then(function(response){
      defer.resolve(response.data);
    });
  }else{
    return q.when('<div class="dialog-bg '+config.backdropClass+'" ng-click="DropCloseDialogs($event)"><div ng-click="$event.stopPropagation()" class="dialog-box '+config.className+'">'+
      (header + _template + footer)+
      '<i ng-click="close($event)" class="dialog-icon-close">&times;</i></div></div>');
  }
  return defer.promise;
};

/**
 * [resolve 依赖方法 弹出框依赖的数据在没有得到的时候将不会显示弹出框]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
Dialogs.prototype.resolve = function(config){
  var q = this.$q;
  var resolves = config.resolve;
  if(angular.isObject(resolves)){
    for(var attr in resolves){
      if(resolves.hasOwnProperty(attr)){
        this.resolveKeys.push(attr);
        this.resolves.push(config.resolve[attr]());
      }
    }
  }
  return q.all(this.resolves);
};


/**
 * [render 编译模版并添加到指定的Dom中]
 * @param  {[JSON]} data   [传入到弹出框中的数据]
 * @param  {[JSON]} config [配置文件]
 * @return {[type]}        [description]
 */
Dialogs.prototype.render = function(data,config){
  var scope = this.scope;
  var animate = this.$animate;
  var controller = this.$controller;
  var compile = this.$compile;

  this.element = angular.element(data);

  if (this.controllerName) {
    this.locals.$scope = scope;
    var ctrl = controller(this.controllerName, this.locals);
    if (this.controllerAs) {
      scope[this.controllerAs] = ctrl;
    }else if (this.locals) {
      for (var prop in this.locals) {
        scope[prop] = this.locals[prop];
      }
    }
  }
  compile(this.element)(scope);
  return animate.enter(this.element, this.container);
};

/**
 * [modal 弹出框方法]
 * @param  {[type]} config [配置文件]
 * @return {[type]}        [description]
 */
Dialogs.prototype.modal = function(conf){
  var config = conf || {};
  var http = this.$http;
  var q = this.$q;
  var rootScope = this.$rootScope;
  var controller = this.$controller;

  var scope = this.scope = rootScope.$new();
  var defer = q.defer();
  var self = this;

  this.container = angular.element(config.container || document.body);
  this.controllerAs = config.controllerAs;
  this.controllerName = config.controller || null;
  this.locals = config.locals || {};

  this.resolve(config).then(function(data){
    angular.forEach(data, function(item, index){
      scope[self.resolveKeys[index]] = item;
    });
    return self.creatHTML(config);
  }).then(function(data){
    // if(!self.element){
      self.render(data,config);
    // }
  });

  scope.ok = function($event){
    self.element.remove();
    scope.$destroy();

    if(angular.isFunction(config.okCallback)){
      config.okCallback($event,scope);
    }
    defer.resolve(scope);
  };

  scope.DropCloseDialogs = function(){
    if(angular.isUndefined(config.isBackdropClickClose) || config.isBackdropClickClose){
      scope.close();
    }
  };

  scope.close = function(){
    self.element.remove();
    self.element = null;
    scope.$destroy();
  };

  scope.cancel = function($event){
    scope.close();
    defer.reject();

    if(angular.isFunction(config.cancelCallback)){
      config.cancelCallback($event,scope);
    }
  };

  return defer.promise;
};


/**
 * [alert 基础弹出框]
 * @param  {[JSON]} config [弹出框配置]
 * @return {[type]}        [description]
 */
Dialogs.prototype.alert = function(confg){
  var config = confg || {};
  var cof = angular.extend(config, {
    dialogHeader: '<h3 class="dialog-title">'+(config.title || '温馨提示')+'</h3>',
    dialogFooter: '<button class="btn btn-sm btn-primary " ng-click="ok($event)">确定</button>'
  });
  return this.modal(cof);
};

/**
 * [confirm 确认弹出框]
 * @param  {[JSON]} config [弹出框配置]
 * @return {[type]}        [description]
 */
Dialogs.prototype.confirm = function(confg){
  var config = confg || {};
  var cof = angular.extend(config, {
    dialogHeader: '<h3 class="dialog-title">'+(config.title || '温馨提示')+'</h3>',
    dialogFooter: '<button class="btn btn-sm btn-primary " ng-click="ok($event)">确定</button><button class="btn btn-sm btn-primary " ng-click="cancel($event)">取消</button>'
  });
  return this.modal(cof);
};

// 注册弹出框服务
app.provider('dialogs', {
  instance: new Dialogs(),

  $get: function($document, $compile, $q, $http, $rootScope, $controller, $animate, $templateCache){
    this.instance.$document = $document;
    this.instance.$compile = $compile;
    this.instance.$q = $q;
    this.instance.$http = $http;
    this.instance.$controller = $controller;
    this.instance.$rootScope = $rootScope;
    this.instance.$animate = $animate;
    this.templateCache = $templateCache;
    return this.instance;
  }
});
