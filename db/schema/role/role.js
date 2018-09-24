var mongoose = require( "mongoose")


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


const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
})



export default function (db) {
    return db.model('User', RoleSchema)
}