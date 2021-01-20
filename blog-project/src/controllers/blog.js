const { SuccessModel } = require("../model/responseModel")

// 与博客相关的方法
const getList = (author, keyword) => {
  // 从数据库中拿数据
  // 使用参数查找后返回

  // 先返回假数据
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      author: '汐潮',
      createTime: 1610795707002
    },
    {
      id: 1,
      title: '标题2',
      content: '内容2',
      author: '闲余',
      createTime: 1610795789977
    },
  ]
}

// 获取博客详情数据
const getDetail = (id) => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    author: '汐潮',
    createTime: 1610795707002
  }
}

// 创建博客
const createNewBlog = (blogData) => {
  // blog 中的数据存到数据库中
  console.log(blogData)
  return {
    id: 1,
  }
}

// 更新博客
const updateBlog = (blogData = {}) => {
  console.log(blogData)
  return true
}

const deleteBlog = (id) => {
  console.log(id)
  return true
}

module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}