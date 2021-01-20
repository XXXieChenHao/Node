const handleBlogRoute = require('./src/routes/blog.js')
const qs = require('querystring')
const { resolve } = require('path')

// 处理POST数据
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData = chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })

  })
  return promise
}


// 服务器处理函数
const serverHandler = (req, res) => {

  // 设置响应格式
  res.setHeader('Content-Type', 'application/json')

  // 获取 path 
  const url = req.url
  req.path = url.split('?')[0] // 将 path 封装到请求对象中 

  // 解析 query参数
  req.query = qs.parse(url.split('?')[1])

  // 处理post数据
  getPostData(req).then(postData => {
    req.body = postData

    // 博客路由
    const blogData = handleBlogRoute(req, res)

    if (blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return
    }

    // 处理异常请求
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found')
    res.end()
  })

}

// 导出 处理函数
module.exports = serverHandler