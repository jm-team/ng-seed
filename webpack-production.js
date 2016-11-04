var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var RemoveWebpackPlugin = require('remove-webpack-plugin');

module.exports = {

    // 插件
    plugins: [
        // 合并生成公用文件 .[hash:8]
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        // 启用文件压缩混淆
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // 移除所有注释
                screw_ie8: false // 默认为true，不支持ie8及以下
            },
            compress: {
                warnings: false,
                screw_ie8: false // 默认为true，不支持ie8及以下
            }
        }),
        new RemoveWebpackPlugin('./dist/'),
        new WebpackMd5Hash()

    ]
};