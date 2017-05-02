const fs = require('fs')
const path = require('path')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const proxyTable = require('./build/proxy')

const config = require('./config/build.config.js').dev
const port = process.env.PORT || config.devServer.port

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) => express.static(resolve(path))

const app = express()

Object.keys(proxyTable).forEach(context => {
  const options = proxyTable[context]

  app.use(proxyMiddleware(options.filter || context, options))
})

app.use('/dist', serve('./dist', true))

app.get('*', (req, res) => {

  res.setHeader('Content-Type', 'text/html')

  res.sendFile(resolve('./dist/index.html'))

})

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
