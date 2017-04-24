var webpack = require('webpack');
var InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
var WebpackChunkHash = require('webpack-chunk-hash');
var RemoveWebpackPlugin = require('remove-webpack-plugin');
var HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('css/sass.[name].[contenthash:8].css');

var os = require('os');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.scss$/i,
                loader: extractSASS.extract(['css', 'sass!postcss'])
            },

        ]
    },

    postcss: function () {
        return [
            require('postcss-sprites')({
                stylesheetPath: './src/asset/css',
                spritePath: './dist/img/sprite',
                filterBy: function (image) {
                    //添加雪碧图规则 只有在sprite文件夹下的图片进行合并
                    if (!/\/sprite\//.test(image.url)) {
                        // console.log(image.url);
                        return Promise.reject();
                    }

                    return Promise.resolve();
                },
                groupBy: function (image) {
                    //添加雪碧图规则 在sprite下，如果包含文件夹则单独进行合并
                    var regex = /\/sprite\/([^/]+)\//g;
                    var m = regex.exec(image.url);
                    if (!m) {
                        return Promise.reject();
                    }
                    return Promise.resolve(m[1]); // 'sprite.' + icon + '.png'
                },
                spritesmith: {
                    padding: 20
                }
            }),
            require('autoprefixer')({
                browsers: ["last 6 version"]
            })
        ];
    },

    // 插件
    plugins: [
        extractSASS,
        // 合并生成公用文件 .[hash:8]
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "manifest"], // vendor libs + extracted manifest
            minChunks: Infinity
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HashedModuleIdsPlugin(),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        // 启用文件压缩混淆
        /*new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // 移除所有注释
                screw_ie8: false // 默认为true，不支持ie8及以下
            },
            compress: {
                warnings: false,
                screw_ie8: false // 默认为true，不支持ie8及以下
            }
        }),*/
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            mangle: true,
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new RemoveWebpackPlugin('./dist/'),
        new WebpackChunkHash()

    ]
};