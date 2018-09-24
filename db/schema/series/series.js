import mongoose from "mongoose"


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


const SeriesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    utime: {
        type: Date
    }
})


export default SeriesSchema