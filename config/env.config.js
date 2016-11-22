var path = require('path');

module.exports = {
	// build 配置
	build: {
		assetsPublicPath: '/dist/', // html 中引用资源的位置 // TODO: CDN地址 https://jm-team.github.io/dist/
		debug: false // debug:true devtool:"#source-map"
	},

	// dev 配置
	dev: {
		assetsPublicPath: '/dist/',
		devServer: {
			host: 'localhost', // 默认localhost <hostname/ip>: hostname or IP. 0.0.0.0 binds to all hosts.
			port: 8081, // http://localhost:8081/
			proxyTarget: 'http://dev-webapi.jm.com' // api服务器地址
		}
	}
};
