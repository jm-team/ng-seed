# webpack

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

### 开发环境 
`npm run dev`

### build
`npm run build`

### 目录文件说明

#### config/
1. `assetsPublicPath` 配置引用资源的位置，用于配置CDN地址，与`index.html`头部的`CDN_ADDRESS`相同
2. dev `devServer` webpack热更新服务器配置，用于配置host访问地址，端口，服务接口反向代理(解决跨域问题)
3. build `debug` 用于配置调试压缩后的代码，true为开启调试模式，浏览器开发工具可查看到未压缩代码

#### dist/
1. dist文件夹将放于CND服务器，所有引用dist目录下资源的地方，都需要可以动态配置域名
2. dist/entry/index.html 为web服务器唯一入口文件，也是唯一的一个文件。因为其他文件都放于CND服务器上
3. dist/img/sprite 该文件夹为雪碧图合成临时文件夹，可以忽略。webpack在生产环境下会重新生成添加hash的图片
4. dist/dep/ie8supports.js 目前为卖塑郎项目打包后的文件，用于兼容ie8、9，一般不会更改比较固定。

#### doc/
1. api.md RESTful API设计规范的demo
2. nginx.conf nginx配置，用于测试生产环境下的代码
3. server.js Prerender.io的服务器配置，用于解决前台页面SEO的问题。注意单线程
4. specification.md 为angular项目规范

#### src/
1. 一级子目录结构不可随意修改
2. css推荐使用sass，css用到了postcss来实现雪碧图、autoprefixer兼容css3
3. dep建议根据文件功能及来源分目录
4. entry index.html SPA入口文件，百度统计脚本放于页面底部
5. img sprite 雪碧图目录，在此文件夹下的图片将合并，子目录会单独合并为一张图片
6. js js目前根据功能进行目录划分，后期将考虑根据组件划分
6.1. app.js 配置项目使用常量、页面路由
6.2. entry.js 页面入口js文件，用于引入页面使用的样式，脚本
7. mock json文件
7.1. 用于开发阶段模拟接口数据
7.2. 在前端固定将来会开发成接口的数据
8. page 页面目录结构需与js/router目录相互统一，common为公用指令模板目录。

#### webpack
1. webpack.config.js webpack通用配置项，根据开发、生产环境配置`./config/env.config.js`添加文件hash
2. webpack-dev.js 提供开发环境热更新服务，指定vendor模文件名为vendor.js，将不包含hash
3. webpack-production.js 生产环境打包，打包前删除dist目录，启用文件压缩混淆，未指定vendor模块文件名，将包含hash

#### end
欢迎提出任何问题及建议
