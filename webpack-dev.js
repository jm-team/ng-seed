var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var config = require('./config/build.config.js').dev;

// 代理对象
var objProxy = {};
// 代理配置参数
var proxyTarget = config.devServer.proxyTarget;

/**
 * 根据config.devServer.proxyTarget的参数，动态配置webapi代理
 */
 if (proxyTarget instanceof Array) {
     /**
      * api服务器地址
      * example: proxyTarget: [
      *              {pattern: '/webapi', address: address.SERVER_ADDRESS},
      *              {pattern: '/dataserviceEN', address: address.JM_BIG_DATA_WEBAPI}
      *            ]
      */
     for (var index in proxyTarget) {
         var pattern = proxyTarget[index].pattern;
         var proxyAddress = proxyTarget[index].address;
         createProxy(objProxy, pattern, proxyAddress);
     }
 } else {
     /**
      * api服务器地址
      * example: proxyTarget: {pattern: '/webapi', address: address.SERVER_ADDRESS}
      */
     if (proxyTarget instanceof Object) {
         var pattern = proxyTarget.pattern;
         var proxyAddress = proxyTarget.address;
         createProxy(objProxy, pattern, proxyAddress);
     } else {
         /**
          * api服务器地址
          * example: proxyTarget: address.SERVER_ADDRESS
          */
         var pattern = '/webapi';
         var proxyAddress = config.devServer.proxyTarget;
         createProxy(objProxy, pattern, proxyAddress);
     }
 }

/**
 * 配置代理项
 * @param objProxy
 * @param pattern
 * @param proxyAddress
 */
 function createProxy(objProxy, pattern, proxyAddress) {
     objProxy[pattern] = {
         target: proxyAddress,
         /**
          * TODO: 二级域名作为代理服务器时应该去掉多余path“/api”
          * http://www.jm.com/api/xxx => http://api.jm.com/xxx
          * not http://api.jm.com/api/xxx
          */
         // pathRewrite: {'^/api' : ''},
         bypass: function (req, res, proxyOptions) {
             // console.log(req.url);
         },
         changeOrigin: true,
         secure: false
     }
 }

module.exports = {
    // 本地服务器配置
    devServer: {
        host: config.devServer.host || '',
        port: config.devServer.port || 8081, // 本地服务器端口配置 e.g. 8081
        hot: true,
        inline: true,
        // api 接口反向代理 解决跨域问题
        proxy: objProxy,
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
