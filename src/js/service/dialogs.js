// module
var app = require('app');


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
 * @param   {object}  config 初始配置
 * @returns {object} promise对象
 */
Dialogs.prototype.creatHTML = function (config) {
    var header = '';
    var footer = '';
    var _template = '<div class="dialog-content">' + (config.template) + '</div>';
    var _templateUrl = config.templateUrl;
    var templateCache = this.$templateCache;
    var q = this.$q;
    var http = this.$http;
    var defer = q.defer();

    // 遮罩层背景
    var backdrop = angular.element('<div class="dialog-bg ' + config.backdropClass + '" ng-click="DropCloseDialogs($event)"></div>');
    var dialogBox = angular.element('<div ng-click="$event.stopPropagation()" class="dialog-box ' + config.className + '">'+ (config.isShowCloseIcon ? (
            '<i ng-click="close($event)" class="dialog-icon-close">&times;</i></div></div>'):''))


    if (config.dialogHeader) {
        header = '<div class="dialog-header">' + config.dialogHeader + '</div>';
    }

    if (config.dialogFooter) {
        footer = '<div class="dialog-footer">' + config.dialogFooter + '</div>';
    }

    if (_templateUrl) {
        http.get(_templateUrl, {
            cache: templateCache
        }).then(function (response) {
            defer.resolve(backdrop.append(dialogBox.append(response.data)));
        });
    } else {
        return q.when(backdrop.append(dialogBox.append((header + _template + footer))));
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
    var q = this.$q;
    var resolves = config.resolve;
    if (angular.isObject(resolves)) {
        for (var attr in resolves) {
            if (resolves.hasOwnProperty(attr)) {
                this.resolveKeys.push(attr);
                this.resolves.push(config.resolve[attr]());
            }
        }
    }
    return q.all(this.resolves);
};


/**
 * 编译模版并添加到指定的Dom中
 * @author zhoul
 * @param   {object} data   传入到弹出框中的数据对象
 * @param   {object} config 配置文件
 * @returns {object} Dom    对象
 */
Dialogs.prototype.render = function (data, config) {
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
        } else if (this.locals) {
            for (var prop in this.locals) {
                scope[prop] = this.locals[prop];
            }
        }
    }
    compile(this.element)(scope);
    return animate.enter(this.element, this.container);
};


/**
 * 弹出框方法
 * @author zhoul
 * @param   {object} conf 配置对象
 * @returns {object} promise
 */
Dialogs.prototype.modal = function (conf) {
    var config = conf || {};
    var http = this.$http;
    var q = this.$q;
    var rootScope = this.$rootScope;
    var controller = this.$controller;

    var scope = this.scope = rootScope.$new();
    var defer = q.defer();
    var self = this;
    var method = config.method;

    this.container = angular.element(config.container || document.body);
    this.controllerAs = config.controllerAs;
    this.controllerName = config.controller || null;
    this.locals = config.locals || {};
    

    console.log(scope);

    this.resolve(config).then(function (data) {
        angular.forEach(data, function (item, index) {
            scope[self.resolveKeys[index]] = item;
        });
        return self.creatHTML(config);
    }).then(function (data) {
        self.render(data, config);
    });

    scope.ok = function ($event) {
        // 判断controller中点击ok后是否需要进一步处理异步操作(如: 登录)
        // 如果是将会处理这个请求服务之后返回promise对象
        // 以便dialogs.model() 能正常使用then 方法处理请求后的操作
        // 执行操作处理函数是通过config.method 传入处理函数的名称字符串 
        // 然后找到controller中对应的处理函数执行 
        if(angular.isFunction(scope[method])){
             scope[method]($event).then(function(data){
                 defer.resolve({scope: scope, data:data});
             }, function(err){
                 defer.reject({scope: scope, err:err});
             });
        }else{
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

    scope.cancel = function ($event) {
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
        dialogFooter: '<button class="btn btn-sm btn-primary " ng-click="ok($event)">确定</button>'
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
        dialogFooter: '<button class="btn btn-sm btn-primary " ng-click="ok($event)">确定</button><button class="btn btn-sm btn-primary " ng-click="cancel($event)">取消</button>'
    });
    return this.modal(cof);
};


/**
 * 关闭弹框方法
 * @author zhoul
 * @returns
 */
Dialogs.prototype.close = function(){
    var self = this;
    var animate = this.$animate;

    if(self.element && angular.isFunction(self.element.remove)){
        if(self.element){
            animate.leave(self.element);
            self.element = null;
        }
        this.scope.$destroy();
    }
};

app.provider('dialogs', {
    instance: new Dialogs(),
    /**
     * 注册弹出框服 
     * @param {object} $document 
     * @param {object} $compile 
     * @param {object} $q 
     * @param {object} $http 
     * @param {object} $rootScope 
     * @param {object} $controller 
     * @param {object} $animate 
     * @param {object} $templateCache 
     * @returns 
     */
    $get: function ($document, $compile, $q, $http, $rootScope, $controller, $animate, $templateCache) {
        this.instance.$document = $document;
        this.instance.$compile = $compile;
        this.instance.$q = $q;
        this.instance.$http = $http;
        this.instance.$controller = $controller;
        this.instance.$rootScope = $rootScope;
        this.instance.$animate = $animate;
        this.instance.$templateCache = $templateCache;
        return this.instance;
    }
});
