var webpack = require('webpack');
var RemoveWebpackPlugin = require('remove-webpack-plugin');

module.exports = {

    // 插件
    plugins: [

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
        new RemoveWebpackPlugin('./dist/')

    ]
};