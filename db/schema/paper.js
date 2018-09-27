const Schema = require('../config/db.conf')

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

const PaperSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true
    },
    task: {
        type: String,
        required: true,
        trim: true
    },
    member: {
        type: String,
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
    corrector: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    correcttime: {
        type: Date,
        required: true
    }
})

module.exports = PaperSchema
