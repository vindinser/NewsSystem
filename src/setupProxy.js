// 配置请求代理
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i.maoyan.com',
      changeOrigin: true
    })
  )
}
