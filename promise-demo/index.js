const fs = require('fs');
const path = require('path');

// function getFileContent(filename, callback) {
//   // 获取数据文件的绝对路径
//   const fullFilename = path.resolve(__dirname, 'data', filename);

//   fs.readFile(fullFilename, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     callback && callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

//  回调地狱 通过回调函数的方式获取结果
//  可读性低
//  难以维护

// getFileContent('a.json', (aData) => {
//   console.log('aData', aData)
//   getFileContent(aData.next, (bData) => {
//     console.log('bData', bData)
//     getFileContent(bData.next, (cData) => {
//       console.log('cData', cData)
//     })
//   })
// })

// Promise 实现不需要接收回调函数
// 使用 Promise 最多只有两层
function getFileContent(filename) {
  const promise = new Promise((resolve, reject) => {
    // 文件绝对路径
    const fullFilename = path.resolve(__dirname, 'data', filename);

    fs.readFile(fullFilename, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

getFileContent('a.json')
.then(aData => {
  console.log('aData', aData)
  return getFileContent(aData.next)
}).then(bData => {
  console.log('bData', bData)
  return getFileContent(bData.next)
}).then(cData => {
  console.log('cData', cData)
  // return getFileContent(cData.next)
})