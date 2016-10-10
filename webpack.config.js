var webpack = require('webpack');
var merge = require('webpack-merge');
var SpritesmithPlugin = require('webpack-spritesmith');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config/index.js');
var webpackConfig;
// multiple extract instances
var extractCSS = new ExtractTextPlugin('css/[name].[hash:8].css');
var extractLESS = new ExtractTextPlugin('css/less.[hash:8].css');

// 获取执行环境
var env = (process.env.NODE_ENV || '').trim();
if (env === 'dev') {
    webpackConfig = require('./webpack-dev.js')
} else if (env === 'production') {
    webpackConfig = require('./webpack-production.js')
}

module.exports = merge({
    // 源文件入口文件
    // 这里的文件在使用html-webpack-plugin的时候
    // 会自动将这些资源插入到html中
    entry: {
        entry: './src/js/entry.js',

        // 公共文件
        vendors: [
            './src/dep/angular.js',
            './src/dep/angular-ui-router.js',
            './src/dep/jm-login-module.js',
            './src/dep/ui-bootstrap-tpls.js',
            './src/dep/angular-resource.js'
        ]
    },

    // 构建之后的文件目录配置
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,//'../static',
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:3].js'
    },

    // webpack 开始执行之前的处理
    resolve: {

        // 配置别名
        alias: {},

        fallback: [path.join(__dirname, './node_modules')],

        // 配置哪些文件不需要后缀自动识别
        extensions: ['', '.js']

    },

    //
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'baggage?[file].html&[file].css'
            }
        ],
        loaders: [
            // 处理angularjs 模版片段
            {
                test: /\.html$/,
                loader: 'ngtemplate?module=app&relativeTo=/src!html',
                exclude: /(entry)/
            },

            // 配置css的抽取器、加载器。'-loader'可以省去
            // 这里使用自动添加CSS3 浏览器前缀
            {
                test: /\.css$/i,
                loader: extractCSS.extract('style-loader', 'css!autoprefixer?{browsers:["last 6 version"]}')
            },

            {
                test: /\.less$/i,
                loader: extractLESS.extract(['css', 'less'])
            },

            // 处理html图片
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "file-loader?name=img/[name].[ext]"
            }
        ]
    },

    // sourceMap
    // devtool: config.build.productionSourceMap ? '#source-map' : false,

    // 插件
    plugins: [
        // new DashboardPlugin(dashboard.setData),
        // 合并生成公用文件 .[hash:8]
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:8].js')

        // 图片合并 支持retina
        , new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, './src/img/'),
                glob: '*.png'
            },
            target: {
                image: './dist/img/sprite.[hash].png',
                css: './src/css/icon.css'
            },
            apiOptions: {
                cssImageRef: "/img/sprite.[hash].png"
            },
            spritesmithOptions: {
                padding: 20
            }
            //retina: config.build.retina
        })

        // 单独使用link标签加载css并设置路径，
        // 相对于output配置中的publickPath  .[hash:8]
        , extractCSS
        , extractLESS
        , new CopyWebpackPlugin([{
            from: './src/dep/ie8supports.js',
            to: './dep'
        },{
            from: './src/mock',
            to: './mock'
        }])
        // new HtmlWebpackPlugin(),
        , new HtmlWebpackPlugin({
            // 生成title
            title: 'webpack App',

            // 输出的文件名称 默认index.html 可以带有子目录
            // filename: './dist/index.html',
            filename: './entry/index.html',

            // 源文件
            // template: './src/index.ejs',
            template: './src/entry/index.html',

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

        })
    ]
}, webpackConfig);
