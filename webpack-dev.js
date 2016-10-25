var webpack = require('webpack');
var config = require('./config/env.config.js').dev;

module.exports = {
    // 本地服务器配置
    devServer: {
        port: config.devServer.port, // 本地服务器端口配置 e.g. 8081
        hot: true,
        inline: true,
        // api 接口反向代理 解决跨域问题
        proxy: {
            '/webapi': {
                target: config.devServer.proxyTarget, // api服务器地址 e.g. 'http://dev-webapi.jm.com'
                bypass: function(req, res, proxyOptions) {
                    console.log(req.url);
                },
                // ignorePath: false,
                changeOrigin: true,
                secure: false
            }
        },
        // 启用html5 3种方式
        // historyApiFallback: true,
        // historyApiFallback: false,
        historyApiFallback: {
            rewrites: [{
                    from: /^\/dist\/.*$/,
                    to: function(context) {
                        console.log(context);
                        return  context.parsedUrl.pathname;
                        //return '/dist/entry/index.html';
                    }
                },
                // shows views/landing.html as the landing page
                // { from: /^\/$/, to: '/dist/entry/index.html' },
                // shows views/subpage.html for all routes starting with /subpage
                // { from: /^\/subpage/, to: '/dist/entry/index.html' },
                // shows views/404.html on all other pages
                { from: /./, to: '/dist/entry/index.html' }
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
