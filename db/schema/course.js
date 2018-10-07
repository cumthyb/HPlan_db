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

const CourseSchema = new mongoose.Schema({
    series: {
        type: mongoose.Schema.ObjectId,
        ref: 'Series'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    coverimg: {
        type: Array
        // required: true
    },
    videourl: {
        type: Array
        // required: true
    },
    audiourl: {
        type: Array
        // required: true
    },
    publish: {
        type: Boolean
        // required: true
    },
    price: {
        type: Number
    },
    discount: {
        type: Number
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    utime: {
        type: Date
    }
})

export default CourseSchema
