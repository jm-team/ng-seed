var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var config = require('../config/build.config.js');
var webpackConfig;
var devtool;
var hash = chunkhash = '';

// 公共類庫文件
var vendorFiles = [
    './dep/angular/angular.min.js',
    './dep/angular/angular-sanitize.min.js',
    './dep/angular/angular-resource.min.js',
    './dep/angular/angular-animate.min.js',
    './dep/angular/ui-bootstrap-tpls.min.js',
    './dep/angular/angular-ui-router.min.js',
    './dep/angular/angular-locale_zh-cn.js',
    './dep/bindonce.js',
    './dep/security.js',
    './dep/ng-lazy-image/lazy-image.js'
];

if (config.echarts.enabled) {
    vendorFiles.push('echarts');
    vendorFiles.push('zrender');
}

// 获取执行环境
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
     */
    entry: {
        // 公共文件
        vendor: vendorFiles,
        entry: './src/main.js'
    },

    // 构建之后的文件目录配置
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: config.assetsPublicPath, // html 中引用资源的位置
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
                loader: 'ngtemplate?module=ng&relativeTo='+(path.resolve(__dirname, '../'))+'!html?attrs=img:src img:img-error div:img-error li:img-error span:img-error a:img-error',
                include: /(src|dep)/
            },

            // 处理html图片
            {
                test: /\.(gif|jpe?g|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?name=img/[name].' + hash + '[ext]'
            }
        ]
    },
    // sourceMap
    devtool: devtool,

    // 插件
    plugins: [
        // 单独使用link标签加载css并设置路径，
        // 相对于output配置中的publickPath
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
        }]),

        // new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 生成title
            title: 'webpack App',
            favicon: './src/asset/img/system/favicon.ico',
            assetsPublicPath: config.assetsPublicPath,
            // 输出的文件名称 默认index.html 可以带有子目录
            // filename: './dist/index.html',
            filename: 'index.html',

            // 源文件
            // template: './src/index.ejs',
            template: 'index.html',

            // 注入资源
            inject: true,

            minify: {
                // 合并多个空格
                collapseWhitespace: true,
                // 删除注释
                removeComments: true,
                // 删除冗余属性
                removeRedundantAttributes: true
            }

        }),

        new ngAnnotatePlugin({
            add: true
        })
    ]
}, webpackConfig);
