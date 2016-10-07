var path = require('path')
module.exports = {
	// build 配置
	build:{
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath:'/',
		productionSourceMap: true,
		retina:2,
		productionGzip: false,
		productionGzipExtensions:['js', 'css']
	},

	// dev 配置
	dev:{
		assetsSubDirectory: 'static',
		assetsPublicPath:'/',
		proxyTable:{},
		retina:2,
		cssSourceMap: false
	}
}
