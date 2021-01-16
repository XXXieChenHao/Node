

# NodeJS 学习笔记

浏览器使用V8以引擎将JavaScript 编译成机器代码
Node是V8引擎的容器，JavaScript 借用Node编译实现在电脑中运行

## 认识HTTP请求
  - 建立连接
    - DNS解析 
    - 建立 TCP 连接（三次握手）  
    - 发送 HTTP 请求
  - 接受请求
    - 服务器接收 HTTP 请求
    - 处理请求
    - 返回数据（响应头、响应主体）
  - 客户端处理
    - 客户端接收到返回的数据
    - 解析数据
    - 处理数据

## NodeJS 服务器

### http 模块
  http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP服务器或客户端功能都必须使用 http 模块

  http 模块内部封装了一个 HTTP 服务器和一个简易的 HTTP 客户端

  1. 创建 http 服务, 首先要引入 http 模块

    ```javascript
    const http = require('http');
    ```

  2. 使用 createServer 方法返回一个 http.Server对象

     ```javascript
     const server = http.createServer((req, res) => {
     	res.end('Hello xichao')
     })
     ```

  3. server.listen 用户服务端监听接口

    ```javascript
    server.listen(5000, () => {
      console.log('server running')
    })
    ```
    
  4. 处理请求(GET请求)

     > 未改变的代码如 server.listen 引入 http 等后续代码不再冗余

  - 请求数据的获取是通过 http.Server  服务器创建时的回调函数中的 第一个参数(下述代码中的req)中获取
    - 获取请求参数需要 使用 querystring 方法，需要如 http 模块的引入

    ```javascript
    const qs = require('querystring');
    
    const server = http.createServer((req, res) => {
      const method = req.method
      console.log('method', method) // 打印请求方法

      const url = req.url
      console.log('url', url) // 打印url

      let query  qs.parse(url.split('?')[1]) 
      // 将url按？分割后 取得分割后的数组的第二项  使用qs.parse 获取请求参数
      res.end(JSON.stringify(query)) 
      // 返回的数据应为字符串类型 所以受用 JSON.stringify 方法将数据转换成JSON数据
     })
    ```
    **注** NodeJS 在未安装插件情况下改变代码需要重新启动服务器才能生效

  - 在浏览器中输入  ``` http://localhost:5000/?author=xichao&address=nicexch.cn  ``` 就可以看到页面响应

  - GET 请求是一种 客户端从服务端获取数据的行为

  5. 处理请求(POST请求)
  - post 请求需要使用 postman 进行模拟客户端发送数据的过程
  - post 请求是一种流传送
    ```javascript
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
    ```
  - POST 请求是一种 客户端将数据发送到服务端的行为

  ### 总结
  - 使用 http 模块，创建服务器、监听端口
  - 创建服务器时的 有两个参数 req res
  - req 为服务器获取客户端数据时使用 
    - req 中包含method url on 等属性
  - res 为服务器响应客户端时使用
    - res.end 操作 向客户端发送响应
  - get 和 post 请求
    - get 请求直接浏览器地址中输入即可 参数使用 urlEncode 即可 (?参数名=参数&参数名=参数) 的形式
    - post 流传递 利用req.on('data', callback) 监听数据获取 并使用回调函数接收二进制数据 记得转化成字符串格式
    - post req.on('end', callback) 表示数据接收完毕
