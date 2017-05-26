var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config/build.config.js');
var webpackConfig;
var devtool;
var hash = chunkhash = '';

// var json = require('./package.json');

// 获取带hash值的dll文件名称
var glob = require('glob')
var dllJsFilePath,
    dllJsFileName
dllJsFilePath = glob.sync(path.join(__dirname, '../dep/vendor/vendor.*.dll.js'))[0]
if (dllJsFilePath) {
    dllJsFileName = path.basename(dllJsFilePath)
}

// 获取执行环境，根据不同环境进行不同处理
var env = (process.env.NODE_ENV || '').trim();
if (env === 'dev') {
    webpackConfig = require('./webpack-dev.js');
    config = config.dev;
    devtool = config.debug ? '#cheap-module-eval-source-map' : false;
} else if (env === 'production') {
    webpackConfig = require('./webpack-production.js');
    config = config.production;
    devtool = config.debug ? '#source-map' : false;
    hash = '[hash:8].';
    chunkhash = '[chunkhash:8].';
}

module.exports = merge({
    /**
     * 源文件入口文件
     * 这里的文件在使用html-webpack-plugin的时候会
     * 自动将这些资源插入到html中
     * 1. 注意chunk顺序
     * 2. jmui需单独维护
     */
    entry: {
        // 公共類庫文件 这里尽量用了min后的文件，以减少build速度，避免uglify高版本对ie8不兼容的问题。
        lib: './dep',  // 公共文件
        jmui: './dep/jmui', // 自定义组件库
        app: './src/main.js' // ng-app入口文件
    },

    // 构建之后的文件目录配置
    output: {
        path: path.join(__dirname, '../dist'), // 构建之后的文件目录
        publicPath: config.assetsPublicPath, // html，css 中引用资源的位置
        filename: 'js/[name].' + chunkhash + 'js',
        chunkFilename: 'js/[name].' + chunkhash + 'js'
    },

    // webpack 开始执行之前的处理
    resolve: {

        // 配置别名
        alias: {
            'address': path.join(__dirname, '../config/address.config'),
            'app': path.join(__dirname, '../src/app'),
            'page': path.join(__dirname, '../src/page'),
            'css': path.join(__dirname, '../src/asset/css')
        },

        // 排除文件目录
        fallback: [path.join(__dirname, './node_modules')],

        // 配置哪些文件不需要后缀自动识别
        extensions: ['', '.js', '.css']
    },

    //
    module: {
        noParse: /(min\.js)$/,
        loaders: [
            // 处理angularjs 模版片段
            {
                test: /\.html$/,
                loader: 'ngtemplate?module=ng&relativeTo=' + (path.resolve(__dirname, '../')) + '!html?attrs=img:src div:url img:img-error div:img-error li:img-error span:img-error a:img-error',
                include: /(src|dep)/
            },

            // 处理html图片
            {
                test: /\.(gif|jpe?g|png|woff|svg|eot|ttf|pdf)\??.*$/,
                loader: 'file-loader?name=img/[name].' + hash + '[ext]'
            }
        ]
    },
    // 开启何种类型的sourceMap，false则不启用
    devtool: devtool,

    // 插件
    plugins: [

        // 相对于output配置中的path
        new CopyWebpackPlugin([{
            from: './dep/ie8support/ie8supports.js',
            to: './dep'
        }, {
            from: './src/mock',
            to: './mock'
        }, {
            from: './src/asset/img/system',
            to: './img/system'
        }, {
            from: './dep/jmui/ueditor',
            to: './js'
        }, {
            from: './dep/vendor',
            to: './js'
        }]),

        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: require('./vendor-manifest.json'),
            sourceType: "window"
        }),
        // 自动插入打包后的css、js文件，
        new HtmlWebpackPlugin({
            // 网站图标文件名不加hash
            favicon: './src/asset/img/system/favicon.ico',

            // 用于ie8support文件路径，因为需要用ie的注释判断，无法使用自动插入功能
            assetsPublicPath: config.assetsPublicPath,

            // 输出的文件名称 默认index.html 可以带有子目录
            filename: 'index.html',

            // 源文件
            template: 'index.html',

            // dll公共文件名称
            dllJsFileName: dllJsFileName,

            // 注入资源
            inject: true,

            minify: {
                // 合并多个空格
                collapseWhitespace: true,
                // 删除注释
                removeComments: true,
                // 删除冗余属性
                removeRedundantAttributes: true
            },
            // chunk排序  'none' | 'auto' | 'dependency' | {function} - default: 'auto'
            // 如果chunk之间无依赖关系（没有使用webpack的require），需要通过函数手动控制
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['lib', 'jmui', 'app']; // 根据此数组索引进行排序
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }

        })
    ]
}, webpackConfig);
