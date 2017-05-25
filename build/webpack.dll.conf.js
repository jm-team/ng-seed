const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// 获取执行环境，根据不同环境进行不同处理

hash = '[hash:8].';

module.exports = {
    entry: {
        vendor: [
            './dep/angular/angular.min.js',
            './dep/angular/angular-sanitize.min.js',
            './dep/angular/angular-resource.min.js',
            './dep/angular/angular-animate.min.js',
            './dep/angular/angular-tree-control.js',
            // './dep/angular/ui-bootstrap-tpls.min.js',
            './dep/angular/angular-ui-router.min.js',
            './dep/angular/angular-locale_zh-cn.js',
            './dep/lazy-image/lazy-image.min.js',
            './dep/bindonce.min.js',
            './dep/security.js',
            './dep/ng.element.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../src'),
        filename: '[name]_[hash].dll.js',
        library: '[name]_[hash]'
    },
    module: {
        // noParse: /(min\.js)$/,
        // loaders: [
        //     // 处理angularjs 模版片段
        //     {
        //         test: /\.html$/,
        //         loader: 'ngtemplate?module=ng&relativeTo=' + (path.resolve(__dirname, '../')) + '!html?attrs=img:src div:url img:img-error div:img-error li:img-error span:img-error a:img-error',
        //         include: /(src|dep)/
        //     },

        //     // 处理html图片
        //     {
        //         test: /\.(gif|jpe?g|png|woff|svg|eot|ttf|pdf)\??.*$/,
        //         loader: 'file-loader?name=img/[name].' + hash + '[ext]'
        //     }
        // ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            libraryTarget: 'window',
            name: '[name]_[hash]'
        })
        // ,
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
}