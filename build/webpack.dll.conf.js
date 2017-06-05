const os = require('os')
const path = require('path')
const webpack = require('webpack')
const RemoveWebpackPlugin = require('remove-webpack-plugin')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')
const WebpackOnBuildPlugin = require('on-build-webpack')
const exec = require('child_process').exec

console.log('=======================================')
console.log('   请确保将新增的dll文件提交至git/svn   ')
console.log('=======================================')

module.exports = {
    entry: {
        vendor: [
            'angular',
            'angular-sanitize',
            'angular-resource',
            'angular-animate',
            'angular-ui-router',
            'angular-lazy-image',
            'angular-bindonce'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dep'),
        filename: 'vendor/[name].[hash:8].dll.js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]_[hash:8]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            libraryTarget: 'window',
            name: '[name]_[hash:8]' // 必须与output.library相同
        }),

        // 启用文件压缩混淆，第三方插件，通过cpu多核计算提高构建性能
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            fromString: true,
            mangle: {
                screw_ie8: false
            },
            output: {
                comments: false, // 移除所有注释
                screw_ie8: false // 默认为true，不支持ie8及以下
            },
            compressor: {
                warnings: false,
                screw_ie8: false,
                drop_console: true,
                drop_debugger: true
            }
        }),

        // remove vendor.***.dll.js
        new RemoveWebpackPlugin('./dep/vendor'),
        // 将新增的dll文件提交至git
        new WebpackOnBuildPlugin(function(stats) {
            // Do whatever you want...
            exec('git add -A')
        })
    ]
}