var webpack = require('webpack');
var config = require('./config/build.config.js').dev;

module.exports = {
    // 本地服务器配置
    devServer: {
        host: config.devServer.host || '',
        port: config.devServer.port || 8082, // 本地服务器端口配置 e.g. 8081
        hot: true,
        inline: true,
        // api 接口反向代理 解决跨域问题
        proxy: {
            '/webapi': {
                target: config.devServer.proxyTarget, // api服务器地址 e.g. 'http://dev-webapi.jm.com'
                bypass: function (req, res, proxyOptions) {
                    console.log(req.url);
                },
                // ignorePath: false,
                changeOrigin: true,
                secure: false
            }
        },
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
        // 合并生成公用文件 .[hash:8]
        new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js')
    ]
};
