# ng-seed
> angular项目基础框架，解决了前后端分离后，前端代码打包合并、资源文件CDN分离部署、单点登录、服务接口跨域、SPA页面SEO等问题    

- [x] 开发阶段服务环境（webpack-dev-server），生产环境（nginx）
- [x] css预处理（less、sass），css3后处理（postcss-autoprefixer）
- [x] 图片合并（postcss-sprites）
- [x] 文件按模块打包（webpack commonjs）
- [x] 资源文件添加MD5命名，解决生产环境部署后的缓存问题（webpack *hash*）
- [x] ng依赖注入自动添加，解决生产环境代码压缩问题(ng-annotate-webpack-plugin)
- [x] 图片懒加载ng插件（ng-lazy-image）
- [x] SPA页面路由（ui-router）
- [x] SPA页面historyApi（webpack-dev-server、nginx配置）
- [x] SPA页面SEO解决方案(Prerender.io)，爬取404页面设置status code为404
- [x] 添加云詞例子[echarts-wordCloud](https://github.com/ecomfe/echarts-wordcloud)
- [x] 添加滚动指令（/scroll）
- [x] 搜索条件保存至URL (/search)
- [x] 富文本编辑器（/ueditor）

## Usage

### 安装依赖包
`npm install` or `npm i` or `cnpm i`

### 开发环境 
`npm run dev`

### 生产环境
`npm run build`

### 生产环境测试服务
`npm run start`

## ng-seed详解

### 目录文件说明

#### build/
1. HashedModuleIdsPlugin.js - webpack2加入的，这里直接引入解决模块id不稳定的问题
2. proxy.js - 根据config.dev.devServer参数生成完整代理配置
3. server.js - 用于查看build之后的代码
4. webpack.config.js - webpack通用配置项，根据开发、生产环境配置`./config/build.config.js`添加文件hash
5. webpack-dev.js - 提供开发环境热更新服务，指定vendor模文件名为vendor.js，将不包含hash
6. webpack-production.js - 生产环境打包，打包前删除dist目录，启用文件压缩混淆，未指定vendor模块文件名，将包含hash

#### config/
1. address.config.js - 配置项目依赖服务器地址
2. build.config.js - `assetsPublicPath` - 配置引用资源的位置，用于配置CDN地址，读取address.config.js配置项 `CDN_ADDRESS`
3. build.config.js - dev `devServer` - webpack热更新服务器配置，用于配置host访问地址，端口，服务接口反向代理(解决跨域问题)
4. build.config.js - build `debug` - 用于配置调试压缩后的代码，true为开启调试模式，浏览器开发工具可查看到未压缩代码
5. build.config.js - echarts enabled - 是否啓用echarts模塊

#### dist/
1. dist文件夹将放于CND服务器，所有引用dist目录下资源的地方，都需要可以动态配置域名：  
1.1. webpack设置publicPath打包时添加  
1.2. angular自定义filter 给资源地址加`CDN_ADDRESS`前缀：cdn  
2. dist/entry/index.html - 为SPA唯一入口文件，也是服务器上唯一的一个文件，因为其他文件都放于CND服务器上
3. dist/img/sprite - 该文件夹为雪碧图合成临时文件夹，可以忽略。webpack在生产环境下会重新生成添加hash的图片
4. dist/dep/ie8supports.js - 目前为卖塑郎项目打包后的文件，用于兼容ie8、9，比较固定一般不会更改。

#### doc/
1. api.md - RESTful API设计规范的demo
2. nginx.conf - nginx配置，用于在本地测试生产环境下代码
3. server.js - Prerender.io的服务器配置，用于解决前台页面SEO的问题。注意单线程
4. specification.md - 为angular项目规范

#### src/
1. css - 推荐使用sass来模块化css文件，css用到了postcss来实现雪碧图、autoprefixer兼容css3
2. dep - 建议根据文件功能及来源分目录
3. entry - index.html SPA入口文件，百度统计脚本放于页面底部
4. img - sprite 雪碧图目录，在此文件夹下的图片将合并，子目录会单独合并为一张图片
5. js - js目前根据功能进行目录划分，后期将考虑根据组件划分    
5.1. app.js - 配置项目使用常量、页面路由    
5.2. entry.js - 页面入口js文件，用于引入页面使用的样式，脚本   
5.3. 文件夹按angular功能划分为 `controller/ directive/ filter/ router/ service/`  
5.4. component - 提取公用ng组件，方便后续代码维护与复用

6. mock - json文件  
6.1. 用于开发阶段模拟接口数据  
6.2. 在前端固定将来会开发成接口的数据  
7. page - 页面目录结构需与js/router目录相互统一，common为公用指令模板目录。
8. 注意一级子目录结构不可随意修改，二级子目录可根据项目复杂度设置多级目录

## 注意事项（坑）
### svn git 使用细节
1. .idea 文件夹需要设为ignore，避免影响到其他开发人员的WebStorm面板
2. node_modules 文件夹需要设为ignore，该文件夹包含文件过多，应由开发人员本地安装

### webStorm 使用细节
1. webpack热更新需要将自动保存功能取消，setting> system setting > use "safe write"
2. node_modules文件夹包含文件过多时，WS会卡死 需右键将该文件夹Mark Directory As > Excluded

### webpack热更新配置
1. build.config.js - `host`修改后不可随意提交，会导致其他开发人员更新后无法启动
2. build.config.js - `port`多个项目启动时注意设置不同端口

## end
欢迎提出任何问题及建议
