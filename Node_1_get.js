// 处理 get 请求

const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const method = req.method;
  console.log('method', method)

  const url = req.url;
  console.log('url', url)

  let query = qs.parse(url.split('?')[1])
  console.log('query', query)

  res.end(
    JSON.stringify(query)
  )
  // res.end('Hello xichao')
})

server.listen(5000, () => {
  console.log('server running')
})