var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var config = require('../config/build.config.js').dev;
var proxyTable = require('./proxy');

module.exports = {
    // 本地服务器配置
    devServer: {
        host: config.devServer.host || '',
        port: config.devServer.port || 8081, // 本地服务器端口配置 e.g. 8081
        hot: true,
        inline: true,
        // api 接口反向代理 解决跨域问题
        proxy: proxyTable,
        // 启用html5
        historyApiFallback: {
            rewrites: [
                // 解决非webpack dev内存中的文件无法访问的问题
                {
                    from: /^\/dist\/.*$/,
                    to: function (context) {
                        console.log(context); // TODO: 404判断 开发环境暂时可忽略
                        return context.parsedUrl.pathname;
                    }
                },
                {
                    from: /./,
                    to: '/dist/entry/index.html'
                }
            ]
        },


        // 指定服务根目录
        contentBase: './',

        stats: {
            colors: true
        }
    },
    // 插件
    plugins: [
        new webpack.NamedModulesPlugin(),
        new FriendlyErrorsPlugin()
    ]
};
