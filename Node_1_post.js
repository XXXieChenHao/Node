const http = require('http')
const qs = require('querystring')

const server = http.createServer((req, res) => {
  if(req.method == 'POST') {
    let postData = ''

    // req 提供了一个方法 on 监听数据
    // 流 stream 的方式接收数据
    req.on('data', chunk => {
      postData += chunk.toString(); // 流接收二进制 应该转为字符串格式
    })

    // 监听数据流接收完毕
    req.on('end', () => {
      console.log('postData', postData)
      res.end('数据接收完毕')
    })

    console.log('post data content type', req.headers['content-type'])

  }
})

server.listen(5000, () => {
  console.log('server running')
})