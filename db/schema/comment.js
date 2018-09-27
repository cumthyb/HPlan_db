import mongoose from 'mongoose'


/**
 * 用户模型
 * @param {String} username 用户名
 * @param {Boolean} isAdmin 是否管理员
 * @param {String} password 密码
 * @param {String} token 认证
 * @param {String} createtime 创建日期
 * @param {String} email 邮箱
 * @param {String} tel 电话
 * */

const CommentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    member: {
        type: String,
        trim: true
    },
    paper: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    rate: {
        type: Number,
        required: true
    },
    ctime: {
        type: Date,
        required: true
    }
})

export default CommentSchema
