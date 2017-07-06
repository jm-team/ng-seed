# Angularjs 项目规范
### 基本说明：
> 项目根目录为webapp 文件夹，开发阶段使用webpack-dev-server/node/[nginx](./nginx.conf)作为本地服务，线上使用nginx。  
> 接口服务需做反向代理，以解决跨域问题。  
> html文件引用静态资源（js，css，img）时，必须使用CDN绝对路径。  
> 文件版本号：框架、类库、第三方插件等需在引用路径中体现版本号，业务代码发布上线时使用文件名+MD5形式。  
> 参考：https://github.com/jm-team/ng-seed

## 一、目录规范
查看[目录文件说明](https://github.com/jm-team/ng-seed/wiki/Constructs)

## 二、第三方库和服务

### 1.Js: 
1. [angualrjs](https://code.angularjs.org/1.2.29/docs/api) v1.2.29
2. [ui-router](http://angular-ui.github.io/ui-router/site/#/api/ui.router) v0.2.10
3. [ngResource](https://code.angularjs.org/1.2.29/docs/api/ngResource/service/$resource) v1.2.29
4. [bindOnce](https://github.com/Pasvaz/bindonce) v0.3.3
5. [ui-bootstrap](http://angular-ui.github.io/bootstrap/versioned-docs/0.12.0/) v0.12.0

注意：查阅api的时候，需要（翻墙）找对应的版本，不然有些方法在老本里都是没有的。

### 2.Css：[bootstrap](http://v3.bootcss.com/) v3.3.1(ui-bootstrap 依赖)
### 3.打包构建工具：[webpack](http://webpack.github.io/docs/)
### 4.测试：krama, jasmine
### 5.SEO：[prerender.io](https://github.com/prerender/prerender)
- Prerender Middleware nginx配置参考[nginx](./nginx.conf)
- Prerender Service配置参考[server.js](./server.js)

## 三、Angular代码规范及建议
### 1.Controller
1. Controller 中不应该出现DOM操作, DOM操作应该在Directive中出现
2. Controller 中不应该出现`$http.get()`、`$ngResource`这些类似的代码 这些应该放在Service中当作服务 然后再Controller 中调用这些服务
3. 尽可能的精简您的Controller 避免Controller 臃肿
4. 控制器异步加载

### 2.Service
1. Service一般用于Controller 之间的数据交互、请求服务端的数据、编写公用方法

### 3.Filter
1. Filter 用于数据的格式化 可在HTML模板中直接使用或在Controller中调用Filter 方法
2. Filter 应尽量在Controller中使用 防止不稳定的过滤器导致程序出错

### 4.Router
1. Router配置文件拆分，每个页面的路由拆分为单独的模块，以免页面过长导致阅读不变，不易维护
2. 页面依赖的Controller在页面加载前，异步加载
3. 部分页面的数据可以在路由中获取

### 5.Directive
1. Directive 用于扩展HTML 使自己定义的HTML具有交互性
2. Directive 一般用属性指令 元素指令在IE低版本浏览器要额外创建这个指令元素
3. 指令中当元素被移除后 要同步删除这个指令的作用域 `$destroy`
4. `ng-repeat`指令使用 `track by` ,参考：http://www.codelord.net/2014/04/15/improving-ng-repeat-performance-with-track-by

### 6.性能优化
1. 在数据不需要双向绑定的地方使用单向绑定 以减少watch数 (使用bindOnce这个库)
2. 按需加载数据 如： 鼠标滚动加载、分页加载
3. 对于一些字典类的数据 可以存放在`Service`或在支持`localstroage`中应放在这些地方 避免多次加载相同数据 (如省市区这些大而且基本不会更改的数据)
4. 在路由状态跳转后对上一个路由中还在请求的XHR 要取消这些请求 防止跳转频率过大导致请求阻塞
5. 如果可以使用ng-if 替代ng-show
6. 异步加载控制器
7. 使用ng-show 显示隐藏搜索时的列表 避免频繁创建删除 如在输入框过滤本地数据的时候
8. 尽可能不使用`ng-mousemove`、`ng-mouseenter`、`ng-mouseleave`...这些高频率触发的事件 或使用定时器定时触发

### 7.与服务端间的交互（注意）
1. Angular在post请求数据的时候传递的参数是通过body体传送的，因此后端那边接收数据的时候需要注意
2. 数据请求使用restful规范，使用angular ngResource 模块
3. Restful详细参考地址：http://www.ruanyifeng.com/blog/2014/05/restful_api.html
4. ngResource使用参考地址：http://www.cnblogs.com/liulangmao/p/3906721.html

### 8.其他注意事项
1. 全局监听事件放在angular启动模块的run方法中，因为run方法在整个angular项目的生命周期中只执行一次
2. 利用拦截器对某一类请求状态做统一处理。如：401需要登录，则跳转到登陆页面
3. 所有的依赖注入需要显示声明,防止依赖压缩找不到。如：
    ```
    app.controller('xxCtrl', ['$scope', 'Service', function($scope, Service){}])
    ```
    
4. 顶级作用域`$rootScope` 尽量不要挂载属性或方法，使用服务`Service`去解决
5. 大的数据列表注意性能

## 四、图片规范
1. 小的背景图片做css sprite
2. 图片做md5防止图片改动缓存问题
3. 根据需求做图片base64位

## 五、CSS样式表
1. 减少样式选择器层级(≤4)
2. 合并压缩CSS样式表
3. 添加md5 防止样式改变缓存问题
4. 尽可能不要用通配选择符
5. 对z-index属性赋予合理的值 防止前面赋值太大 导致后面覆盖前面越来越大
6. 组件类的CSS 一般带上前缀以便后面的取名复用

## 六、Html
1. 合并压缩html
2. 尽量减少DOM嵌套层级
3. 不使用废弃标签
4. 不写行内样式 遵循结构、表现、行为三者分离
5. Html要有语义化

## 七、文件命名和代码风格
1. page文件夹中的js文件名称为`模板名称.类型.js` 如：`about.html` 对应有 `about[.controller].js` `about.router.js`
2. 文件名有多个单词使用驼峰式
3. JS 代码中应使用匈牙利命名法
> 参考  
百度：https://github.com/jm-team/spec/blob/master/javascript-style-guide.md  
angular-styleguide: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure

## 八、浏览器兼容性要求
1. 兼容所有主流标准浏览器，IE8及以上IE浏览器。  
    注：主流标准浏览器包含：chrome、Safari、Firefox、Microsoft Edge等，国内平台还需适当兼顾360浏览器、QQ浏览器
2. 不支持H5，css3交互的浏览器，需使用js进行兼容。
3. 小于ie8浏览器访问需提示用户升级浏览器。Body顶部添加如下代码，样式可根据网站具体ui进行调整：

```html
<!--[if lt IE 8]>
<p class="browsehappy">
    你正在使用一个<strong>过时</strong>的浏览器。请<a class="link" target="_blank" href="http://browsehappy.com">升级你的浏览器</a>以查看此页面。
</p>
<![endif]-->
```

```html
<!--[if lt IE 8]>  
<p class="browsehappy">
    You are using an <strong>outdated</strong> browser. Please <a class="link" target="_blank" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
</p>  
<![endif]-->
```

## 九、浏览器分辨率适配要求
1. 前台网站一般页面，内容固定宽度1190分辨率（电商平台、物流平台）。Body需加min-width:1190px，以适配移动端访问。
2. 前台网站满屏设计页面，内容需要考虑1920\*1080至1024\*768分辨率下的适配效果（官网、三馆、专题）。
3. 后台管理网站需采用流式布局，最小宽度适配至1280分辨率。

## 十、技术架构要求
1. 前台网站**整站**必须做图片懒加载
2. 项目所有依赖的静态资源**必须**从cdn服务器获取
3. 网站页面加载顺序，**公共底部**等不应在内容显示之前提前显示
4. 搜索页面url**必须**保存搜索条件  
5. 所有的网站在pc和手机浏览器能**正常访问**
6. ~~项目代码自动打包上线-合并请求~~ 工具实现

