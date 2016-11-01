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
                // 移除所有注释
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new RemoveWebpackPlugin('./dist/'),
        new WebpackMd5Hash()

    ]
};