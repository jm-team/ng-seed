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
- [x] 校验git提交备注格式(validate-commit-msg)
- [x] 生成发布日志
- [x] 生成jsdoc
- [x] 生成authors
- [x] 代码检查工具(fecs)

## Usage

### 安装依赖包
`yarn install` or `yarn`

### 开发环境 
`yarn run dev`

### 生产环境
`yarn run build`

### 生产环境测试服务
`yarn run start`

### 生成发布日志
`yarn run changelog`

### 生成jsdoc
`yarn run jsdoc`

### 生成authors
`yarn run authors`

### 检查git commit格式钩子
husky - commitmsg `validate-commit-msg`


## ng-seed详解

### 目录文件说明

#### index.html
1. index.html - 为SPA唯一入口文件，百度统计脚本放于页面底部

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
5. build.config.js - echarts `enabled` - 是否啓用echarts模塊

#### dep/
1. dep - 建议根据文件功能及来源分目录

#### dist/
1. dist文件夹将放于CND服务器，所有引用dist目录下资源的地方，都需要可以动态配置域名：  
1.1. webpack设置publicPath打包时添加  
1.2. angular自定义filter - `cdn`, 给资源地址加`CDN_ADDRESS`前缀    
2. dist/img/sprite - 该文件夹为雪碧图合成临时文件夹，可以忽略。webpack在生产环境下会重新生成添加hash的图片
3. dist/dep/ie8supports.js - 目前为[卖塑郎项目](https://github.com/jm-team/MSL-V3/tree/master/static/dep/ie8supports)打包后的文件，用于兼容ie8、9，比较固定一般不会更改。

#### doc/
1. api.md - RESTful API设计规范的demo
2. nginx.conf - nginx配置，用于在本地测试生产环境下代码
3. server.js - Prerender.io的服务器配置，用于解决前台页面SEO的问题。注意单线程
4. specification.md - 为angular项目规范

#### src/
1. app.js - 配置项目使用常量、页面路由    
2. main.js - 页面入口js文件，用于引入页面使用的样式，脚本   
3. asset - 存放css、img等静态资源  
3.1. css - 推荐使用sass来模块化css文件，css用到了postcss来实现雪碧图、autoprefixer兼容css3
3.2. img - sprite 雪碧图目录，在此文件夹下的图片将合并，子目录会单独合并为一张图片
4. component - 提取公用ng组件，方便后续代码维护与复用
5. filter - 过滤器，处理数据格式
6. layout - 页面布局公共指令
7. mock - json文件  
7.1. 用于开发阶段模拟接口数据  
7.2. 在前端固定将来会开发成接口的数据  
8. page - 包含`controller`、`router`、`template`
9. service - 包含api服务、工具函数、数据单例
> 注意一级子目录结构不可随意修改，二级子目录可根据项目复杂度设置多级目录

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

### yarn安装失败
1. 强烈建议使用淘宝镜像 `yarn config set registry http://registry.npm.taobao.org`
2. 指定node-sass的下载源 `yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass`

## End
欢迎提出任何问题及建议

**[:arrow_up:Back to top](#ng-seed)**
