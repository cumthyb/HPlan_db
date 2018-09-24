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


const OrderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true
    },
    member: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    paytime: {
        type: Date
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    }
})



export default function (db) {
    return db.model('User', OrderSchema)
}