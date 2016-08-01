/**
 * Created by Administrator on 2016/7/4 0004.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWepackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var sprite = require('sprite-webpack-plugin');

var es3ifyPlugin = require('es3ify-webpack-plugin');

console.log(path.join(__dirname, './src/js/app.js'));

module.exports = {
  entry: {
    entry: path.join(__dirname, './src/js/entry.js'),
    vendors: [
              // path.join(__dirname, './src/dep/sizzle.min'),
              // path.join(__dirname, './src/dep/velocity.js'),
              path.join(__dirname, './src/dep/angular.js'),
              path.join(__dirname, './src/dep/angular-resource.js'),
              path.join(__dirname, './src/dep/bindonce.js'),
              path.join(__dirname, './src/dep/ui-bootstrap-tpls.js'),
              path.join(__dirname, './src/dep/angular-ui-router.js')]
  },

  resolve: {
    alias: {
      page: path.join(__dirname, './src/page/page.js'),
      app: path.join(__dirname, './src/js/app.js'),
      service: path.join(__dirname, './src/js/service/service.js'),
      directive: path.join(__dirname, './src/js/directive/directive.js'),
      specials: path.join(__dirname, './src/js/controller/specials.js')
    }
  },

  output: {
    // 文件生成之后放置的位置
    path: path.join(__dirname, 'dist'),

    // 主入口文件的js文件 名称 +  hash
    filename: 'js/[name].[chunkhash:8].js',

    // html 中引用资源的位置
    publicPath: 'http://www.jyt.com/dist/',

    // 生成的js文件 名称 + hash   [chunkhash:8]
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    loaders: [
      //配置css的抽取器、加载器。'-loader'可以省去
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
      // 处理html图片
      ,{
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "file-loader?name=img/[name].[ext]"
      }
      // 将es6代码编译成es5
      // ,{
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude:/node_module|dep/,
      //   query: {
      //     presets: ['es2015']
      //   }
      // }
    ]
  },
  plugins: [

    //  合并生成公用文件 .[hash:8]
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),

    // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath  .[hash:8]
    new ExtractTextPlugin('css/[name].css'),

    // html 插件
    // 自动插入js引用
    // html 压缩
    new HtmlWepackPlugin({
      template: './src/entry/index.html',
      filename: './entry/home.html',
      inject: true,
      // hash: true,
      minify: {
        //移除HTML中的注释
        removeComments: false,

        //删除空白符与换行符
        collapseWhitespace: false
      }
    })

    // 将es6代码编译成es3
    // 兼容IE8
    //  ,new es3ifyPlugin()

    // 代码压缩
    // ,new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })

      // new sprite({
      //   'source': __dirname + '/sprites/',
      //   'imgPath': __dirname + '/src/images/',
      //   'cssPath': __dirname + '/src/css/'
      // })
  ]
}
