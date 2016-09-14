// https://github.com/shelljs/shelljs
require('shelljs/global')
// rm('-rf', './static/*')
rm('-rf', './dist')
mkdir('./dist')
cp('-R',  './src/entry', './dist/entry')
cp('-R',  './src/img', './dist/img')

var webpack = require('webpack')
var merge = require('webpack-merge')
var SpritesmithPlugin = require('webpack-spritesmith')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config/index.js')


module.exports = {

  // // 插件
  plugins:[

    // 启用文件压缩混淆
    new webpack.optimize.UglifyJsPlugin({
      output: {
        // 移除所有注释
        comments: false
      },
      compress: {
        warnings: false
      }
    })

  ],
}
