var path = require('path')
module.exports = {
	// build 配置
	build:{
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		// html 中引用资源的位置
		assetsPublicPath: 'http://static.jumoreyun.com/dist/',
		productionSourceMap: true,
		retina:2,
		productionGzip: false,
		productionGzipExtensions:['js', 'css']
	},

	// dev 配置
	dev:{
		assetsSubDirectory: 'static',
		assetsPublicPath:'/dist/',
		proxyTable:{},
		retina:2,
		cssSourceMap: false
	}
}
