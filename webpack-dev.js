module.exports = {
  // 本地服务器配置
  devServer:{
    // 本地服务器端口配置
    port: 8081,

    hot : true,
    // 启用html5
    historyApiFallback: true,

    // 指定服务根目录
    contentBase:'./dist/',

    stats:{
      colors: true,
    }
  }
}
