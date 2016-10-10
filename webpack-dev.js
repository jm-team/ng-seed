module.exports = {
    // 本地服务器配置
    devServer: {
        // 本地服务器端口配置
        port: 8081,
        hot: true,
        inline: true,
        // api 接口反向代理 解决跨域问题
        proxy: {
            '/webapi': {
                target: 'http://dev-webapi.jm.com',
                bypass: function (req, res, proxyOptions) {
                    console.log(req.url)
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
            rewrites: [
                // shows views/landing.html as the landing page
                { from: /^\/$/, to: '/dist/entry/index.html' },
                // shows views/subpage.html for all routes starting with /subpage
                // { from: /^\/subpage/, to: '/dist/entry/index.html' },
                // shows views/404.html on all other pages
                {from: /./, to: '/dist/entry/index.html'}
            ]
        },


        // 指定服务根目录
        contentBase: './dist',

        stats: {
            colors: true
        }
    }
};