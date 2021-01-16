// 基类模型 ——用以返回数据

class BaseModel {
  constructor (data, message) {
    // 如果 data 传递的不是对象而是字符串 则兼容处理 将data赋值给message  并且清空形参中的 data和 message 保证后续if判断不会执行
    
    if(typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }

    if(data) {
      this.data = data;
    }

    if(message) {
      this.message = message
    }

  }
}
// 规范化返回数据

// 定义成功模型
class SuccessModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.code = 200; // 成功
  }
}

// 定义失败模型
class ErrorModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.code = 0; // 失败
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}