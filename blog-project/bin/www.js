//  创建服务器
const http = require('http')

const serverHandler = require('../app.js')

const PORT = 5000;

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log('server running at port ' + PORT)
})