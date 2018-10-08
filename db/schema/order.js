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

const OrderSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        trim: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    paytime: {
        type: Date
    },
    paychannel: {
        type: String,
        required: true,
        trim: true
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    }
})

export default OrderSchema
