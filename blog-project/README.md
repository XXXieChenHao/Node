# 小型博客项目

## 1. 搭建开发环境
1. 创建 package.json 文件
 - 方便开发中使用一些 npm 包
 使用命令 `npm init -y` 创建package.json

2. 创建 bin 文件夹
  整个项目最开始的文件夹

3. bin -> 下创建 www.js 为整个项目的入口文件
  - www.js 中创建服务器
  - http.server 的处理函数 提取出来放在 根目录 下的 app.js 中方便后管理维护
4. 根 下创建 app.js
  使用 moudle.exports 导出创建的处理函数 并在 www.js 中引入 使用require 引入 将处理方法 放入 createServer 的回调中
  - 设计响应头 `res.setHeader('Content-Type', 'application/json')`
  - 发送响应数据 `res.end(JSON.stringify(responseData))`
5. 修改 package.json 的入口文件 main 修改为bin/www.js  
  - 此步骤告诉代码 项目执行时第一个执行的文件

6. 安装 nodemon
  - 安装代码 `npm install nodemon -D`
  - 插件说明  nodemon是一种自动检测目录文件并通过重新启动程序调试基于node.js 应用程序的工具
  - 安装好后 再package.json script中设置项目启动方式
    `"dev": "nodemon bin/www.js"`  使用nodemon 执行代码  
    执行方式 `npm run dev`

## 2. 初始化路由
> 路由文件为 app.js 中功能实现的具体细分

  1. 在根目录下创建 src\route\blog.js 文件和文件夹
  2. 在blog.js 中暴露方法 并且接收两个参数 req，res
    - 需要得到 请求方法、请求url、路径（路由）path、以及参数的接收
  3. 在app.js 中引入blog.js 并在serverHandle中使用其方法，传入req，res 接收返回值

### 封装接口
  1. 将接口统一封装到 src/api/api.js 中。 这样只需要维护一处就可以在多个地方使用了
  2. 如果api接口过多，可以分建不同的文件用以存储不同操作的API， 后期维护时有效的减少时间， 
  3. 在 blog.js 中引用 API 文件， 使用 API.参数名 直接引用

### 规范化返回数据
  - 新建文件 src\model\responseModel.js 用以建立返回模型
    1. 建立基类 class BaseModel 因为无论成功还是失败都需要获取 数据和响应 所以作为基类 
    2. 成功模型 class SuccessModel extends BaseModel  在其中调用父类构造函，并且设置 code为200 标识成功
    3. 失败模型 class ErrorModel extends BaseModel 在其中调用父类构造函数 并且设置 code为0 标识失败

### 定义 controller 层
  - 建立文件 src\controllers\blog.js
  - controller 控制器，负责业务调度 对上（路由） 接收参数 对下（数据库）进行增删改查
  - 执行步骤
    1. 在 routes\blog.js 中调用 controllers 中的方法 将参数传入
    2. controllers\blog.js 中执行相应的方法，调用数据库进行操作 再将结果返回
    3. routes\blog.js 中获取返回的参数使用 成功模型或失败模型 将数据返回给app.js 层，然后返回给客户端

### 处理 Post 数据
  - Post 请求需要数据流的形式获取数据  实际上是异步代码
  1. 在app.js 中定义一个方法 getPostData 并且使用 Promise 进行处理
    - 判断是否为 post 请求
    - 判断请求格式是否为 json (暂时只做JSON)
    - 使用流接收数据
    - 数据完成时 判断是否存在数据
    - resolve(数据)
    - 其他情况resolve(空对象)
  2. 在 getPostData().then 的回调函数中将返回值保存给 req 对象的body属性上方便后续的获取
    - 不论数据是否为 post 请求都会在执行 getPostData() 后向下执行进入路由之中
    - 在路由中通过 req.body 即可获取数据
    - 不会影响到正常的 get 请求