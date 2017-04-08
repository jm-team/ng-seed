var fs = require('fs')
var path = require('path')
var express = require('express')
var config = require('../config/build.config').dev
var resolve = file => path.resolve(__dirname, file)
var proxyMiddleware = require('http-proxy-middleware')
var app = express()
var serve = (path, cache) => express.static(resolve(path))
var proxyTable = require('./proxy');

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];

    app.use(proxyMiddleware(options.filter || context, options))
})

app.use('/dist', serve('../dist', true))

app.get('*', (req, res) => {

    res.setHeader("Content-Type", "text/html")

    res.sendfile('dist/entry/index.html');

})

var port = process.env.PORT || config.devServer.port

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
