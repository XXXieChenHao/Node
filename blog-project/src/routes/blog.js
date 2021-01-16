// 引入接口文件
const API = require('../api/api.js')
const { SuccessModel } = require('../model/responseModel.js')
const {getList, getDetail} = require('../controllers/blog.js');

// 处理博客相关路由
const handleBlogRoute = (req, res) => {
    // 定义路由的逻辑
    // const method = req.method
    // const url = req.url
    // const path = url.split('?')[0];
    // 将path 在app.js 中封装到req.path
    const method = req.method
    
    if(method === 'GET' && req.path === API.getBlogList) {
        const autor = req.query.author || ''
        const keyword = req.query.keyword ||''
        const listData = getList(autor ,keyword)
        return new SuccessModel(listData)

        // return {
        //     message: '获取博客列表接口'
        // }
    }
    if(method === 'GET' && req.path === API.getBlogDetail) {
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData)

    }
    if(method === 'POST' && req.path === API.createBlog) {
        console.log(req.body)
        return {
            message: '新建博客的接口'
        }
    }
    if(method === 'POST' && req.path === API.updateBlog) {
        return {
            message: '更新博客的接口'
        }
    }
    if(method === 'POST' && req.path === API.deleteBlog) {
        return {
            message: '删除博客列表接口'
        }
    }
}

// 在 app.js 的应用函数中 执行此方法
module.exports = handleBlogRoute