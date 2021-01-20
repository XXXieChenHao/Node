/*
 * @Author: 汐潮
 * @Date: 2021-01-20 09:32:13
 * @LastEditTime: 2021-01-20 10:23:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog-project\src\routes\blog.js
 */
// 引入接口文件
const { SuccessModel } = require('../model/responseModel.js')
const { getList, getDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blog.js')

// 处理博客相关路由
const handleBlogRoute = (req, res) => {
    // 定义路由的逻辑
    // const method = req.method
    // const url = req.url
    // const path = url.split('?')[0];
    // 将path 在app.js 中封装到req.path
    const method = req.method

    if (method === 'GET' && req.path === '/api/blog/list') {
        const autor = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(autor, keyword)
        return new SuccessModel(listData)

        // return {
        //     message: '获取博客列表接口'
        // }
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData)

    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body
        const newBlogData = createNewBlog(blogData)
        return new SuccessModel(newBlogData)
        // return {
        //     message: '新建博客的接口'
        // }
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const blogData = req.body
        const updateBlogData = updateBlog(blogData)
        if (updateBlogData) {
            return new SuccessModel('更新博客成功')
        } else {
            return new SuccessModel('更新博客失败')
        }
        // return {
        //     message: '更新博客的接口'
        // }
    }
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const id = req.query.id
        const deleteBlogData = deleteBlog(id)
        if (deleteBlogData) {
            return new SuccessModel('删除博客成功')
        } else {
            return new SuccessModel('删除博客失败')
        }
    }
}

// 在 app.js 的应用函数中 执行此方法
module.exports = handleBlogRoute