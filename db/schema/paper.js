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

const PaperSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
        required: true,
        trim: true
    },
    member: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    submittime: {
        type: Date,
        default: Date.now
    },
    submittimes: {
        type: Number,
        default: 1
    },
    modifytime:{
        type: Date,
        default: Date.now
    },
    corrector: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    correctcontent: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    correcttime: {
        type: Date,
    },
    correcttimes: {
        type: Number,
        default: 1
    }
})

export default PaperSchema
