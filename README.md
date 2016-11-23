# ng-seed
> angular项目基础框架，解决了前后端分离后，前端代码打包合并、资源文件CND分离部署、单点登录、服务接口跨域、SPA页面SEO等问题    

- 开发阶段服务环境（webpack-dev-server），生产环境（nginx）
- css预处理（less、sass），css3后处理（postcss-autoprefixer）
- 图片合并（postcss-sprites）
- 文件按模块打包（webpack commonjs）
- 资源文件添加MD5命名，解决生产环境部署后的缓存问题（webpack *hash*）
- ng依赖注入自动添加，解决生产环境代码压缩问题(ng-annotate-webpack-plugin)
- 图片懒加载ng插件（ng-lazy-image）
- SPA页面路由（ui-router）
- SPA页面historyApi（webpack-dev-server、nginx配置）
- SPA解决SEO方案(Prerender.io)

## webpack
> pacekage 中的scripts 设置环境变量

### windows:
``` javascript
{ 
  "dev": "set NODE_ENV=dev && webpack-dev-server --progress --hot",
  "build": "set NODE_ENV=production && webpack"
}
```

### linux or osx:

``` javascript
{
  "dev": "NODE_ENV=dev webpack-dev-server --progress --hot",
  "build": "NODE_ENV=production  webpack"
}
```
## Usage
### 开发环境 
`npm run dev`

### build
`npm run build`

## ng-seed详解

### 目录文件说明

#### config/
1. `assetsPublicPath` 配置引用资源的位置，用于配置CDN地址，与`index.html`头部的`CDN_ADDRESS`相同
2. dev `devServer` webpack热更新服务器配置，用于配置host访问地址，端口，服务接口反向代理(解决跨域问题)
3. build `debug` 用于配置调试压缩后的代码，true为开启调试模式，浏览器开发工具可查看到未压缩代码

#### dist/
1. dist文件夹将放于CND服务器，所有引用dist目录下资源的地方，都需要可以动态配置域名：  
1.1. webpack设置publicPath打包时添加  
1.2. angular 自定义filter 给资源地址加`CDN_ADDRESS`前缀：cdn  
2. dist/entry/index.html 为SPA唯一入口文件，也是服务器上唯一的一个文件，因为其他文件都放于CND服务器上
3. dist/img/sprite 该文件夹为雪碧图合成临时文件夹，可以忽略。webpack在生产环境下会重新生成添加hash的图片
4. dist/dep/ie8supports.js 目前为卖塑郎项目打包后的文件，用于兼容ie8、9，比较固定一般不会更改。

#### doc/
1. api.md RESTful API设计规范的demo
2. nginx.conf nginx配置，用于在本地测试生产环境下的代码
3. server.js Prerender.io的服务器配置，用于解决前台页面SEO的问题。注意单线程
4. specification.md 为angular项目规范

#### src/
1. css推荐使用sass，css用到了postcss来实现雪碧图、autoprefixer兼容css3
2. dep建议根据文件功能及来源分目录
3. entry index.html SPA入口文件，百度统计脚本放于页面底部
4. img sprite 雪碧图目录，在此文件夹下的图片将合并，子目录会单独合并为一张图片
5. js js目前根据功能进行目录划分，后期将考虑根据组件划分    
5.1. app.js 配置项目使用常量、页面路由    
5.2. entry.js 页面入口js文件，用于引入页面使用的样式，脚本   
5.3. 文件夹按angular功能划分为 `controller/ directive/ filter/ router/ service/`

6. mock json文件  
6.1. 用于开发阶段模拟接口数据  
6.2. 在前端固定将来会开发成接口的数据  
7. page 页面目录结构需与js/router目录相互统一，common为公用指令模板目录。
8. 注意一级子目录结构不可随意修改，二级子目录可根据项目复杂度设置多级目录

#### webpack
1. webpack.config.js webpack通用配置项，根据开发、生产环境配置`./config/env.config.js`添加文件hash
2. webpack-dev.js 提供开发环境热更新服务，指定vendor模文件名为vendor.js，将不包含hash
3. webpack-production.js 生产环境打包，打包前删除dist目录，启用文件压缩混淆，未指定vendor模块文件名，将包含hash  
	> UglifyJsPlugin注意在2.7.0以上默认不支持ie8,需配置screw_ie8为false [issues12](https://github.com/jm-team/Bugs/issues/12)

#### end
欢迎提出任何问题及建议
