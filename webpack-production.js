var webpack = require('webpack');

module.exports = {

    // // 插件
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
        })

    ]
};