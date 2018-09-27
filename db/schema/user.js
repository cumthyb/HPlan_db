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

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true
    },
    alias: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: 'normal'
    },
    pwd: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    logintime: {
        type: Date,
        default: Date.now
    },
    tel: {
        type: String,
        required: true,
        trim: true
    },
    qq: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    avatar: {
        type: String
    }
})

export default UserSchema
