var config = require('../config/build.config').dev;

// 代理对象
var objProxy = {};
// 代理配置参数
var proxyTarget = config.devServer.proxyTarget;

/**
 * proxyTarget必须为数组对象
 */
if (!Array.isArray(proxyTarget)) {
    throw new Error(`The proxyTarget must be an array of objects!
     * sample:
     *   proxyTarget: [
     *     {pattern: '/webapi', address: address.SERVER_ADDRESS},
     *     {pattern: '/dataserviceEN', address: address.JM_BIG_DATA_WEBAPI}
     *   ]`)
}

// 构造代理对象
proxyTarget.forEach(function (proxy) {
    createProxy(objProxy, proxy.pattern, proxy.address);
});


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
          // console.log("======================")
          // console.log(req.url)
          // console.log(res.req);
          // console.log(proxyOptions)
          // console.log(req.url.replace('/dove', ''))
         // return proxyOptions.target + req.url.replace('/dove/', '');
        },
        changeOrigin: true,
        secure: false
    }
}


module.exports = objProxy;
