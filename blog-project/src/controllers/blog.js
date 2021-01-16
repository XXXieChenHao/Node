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

module.exports = {
  getList,
  getDetail
}