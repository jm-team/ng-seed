var address = require('./address.config.js');

module.exports = {
	// production 配置
	production: {
		assetsPublicPath: address.CDN_ADDRESS + '/dist/', // html 中引用资源的位置 // TODO: CDN地址 https://jm-team.github.io/dist/
		debug: false // debug:true devtool:"#source-map"
	},

	// dev 配置
	dev: {
		assetsPublicPath: '/dist/',
        debug: true, // debug:true devtool:"#cheap-module-eval-source-map"
		devServer: {
			host: '192.168.23.119', // 默认localhost <hostname/ip>: hostname or IP. 0.0.0.0 binds to all hosts.
			port: 8081, // http://localhost:8081/
			proxyTarget: [
				{ pattern: '/webapi', address: address.SERVER_ADDRESS }
				//, {pattern: '/dataserviceEN', address: address.JM_BIG_DATA_WEBAPI}
			] // api服务器地址
		}
	}
};
