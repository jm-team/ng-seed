var path = require('path')
module.exports = {
	// build 配置
	build:{
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath:'/',
		productionSourceMap: true,

		productionGzip: false,
		productionGzipExtensions:['js', 'css']
	},

	// dev 配置
	dev:{
		port: 8081,
		assetsSubDirectory: 'static',
		assetsPublicPath:'/',
		proxyTable:{},

		cssSourceMap: false
	}
}
