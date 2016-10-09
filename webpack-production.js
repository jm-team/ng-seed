// https://github.com/shelljs/shelljs
require('shelljs/global');
rm('-rf', './dist');
mkdir('./dist');
cp('-R', './src/entry', './dist/entry');
cp('-R', './src/img', './dist/img');

module.exports = {

    // // 插件
    plugins: [

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

    ]
};
