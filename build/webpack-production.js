var webpack = require('webpack');
var InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
var WebpackChunkHash = require('webpack-chunk-hash');
var RemoveWebpackPlugin = require('remove-webpack-plugin');
var HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('css/[name].[contenthash:8].css');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;

var os = require('os');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss$/i,
                loader: extractSASS.extract(['css', 'postcss!sass?config=sassLoaderConfig'])
            },

        ]
    },

    postcss: function () {
        return [
            // 合并雪碧图插件
            require('postcss-sprites')({
                stylesheetPath: './src/asset/css',
                spritePath: './dist/img/sprite',

                // 添加雪碧图规则 只有在sprite文件夹下的图片才进行合并
                filterBy: function (image) {
                    if (!/\/sprite\//.test(image.url)) {
                        // console.log(image.url);
                        return Promise.reject();
                    }

                    return Promise.resolve();
                },

                // 添加雪碧图规则 在sprite文件夹下，如果包含子文件夹则该文件夹包含的图片单独进行合并
                groupBy: function (image) {
                    var regex = /\/sprite\/([^/]+)\//g;
                    var m = regex.exec(image.url);
                    if (!m) {
                        return Promise.reject();
                    }
                    return Promise.resolve(m[1]); // 'sprite.' + icon + '.png'
                },

                // 图片之间的距离
                spritesmith: {
                    padding: 20
                }
            }),
            // css3的浏览器兼容性补全插件
            require('autoprefixer')({
                browsers: ["last 6 version"]
            })
        ];
    },

    // 插件
    plugins: [
        // 从chunk文件中抽出css文件
        extractSASS,
        // angular自动依赖注入插件，自定义方法需要用特殊占位符 /*@ngInject*/
        new ngAnnotatePlugin({
            add: true
        }),
        // 将webpack runtime 和 manifest 从vendor里抽出
        new webpack.optimize.CommonsChunkPlugin({
            name: ["lib", "manifest"], // vendor libs + extracted manifest
            minChunks: Infinity
        }),
        // 根据模块依赖次数进行排序
        new webpack.optimize.OccurenceOrderPlugin(),
        // 将模块Id转为hash值，解决模块id为数字时不稳定的问题，对应开发环境HashedModuleIdsPlugin
        new HashedModuleIdsPlugin(),
        // 将webpack runtime内嵌至index.html，需要和HtmlWebpackPlugin配合使用
        // 需在模板文件加上占位符 <%=htmlWebpackPlugin.files.webpackManifest%>
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        // 启用文件压缩混淆，第三方插件，通过cpu多核计算提高构建性能
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            fromString: true,
            mangle: {
                screw_ie8: false
            },
            output: {
                comments: false, // 移除所有注释
                screw_ie8: false // 默认为true，不支持ie8及以下
            },
            compressor: {
                warnings: false,
                screw_ie8: false,
                drop_console: true,
                drop_debugger: true
            }
        }),
        // 构建前删除dist文件夹
        new RemoveWebpackPlugin('./dist/'),
        // 第三方的ChunkHash计算插件，把从js中抽取的css文件进行单独的hash计算
        new WebpackChunkHash(),
        new ImageminPlugin({ test: 'img/**' })

    ]
};
