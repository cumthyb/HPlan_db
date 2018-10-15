import UserSchema from '../schema/user.js'
import jwt from 'jsonwebtoken'
import jwtConf from '../../config/jwt.conf'
import SendEmail from '../../utils/email.js'
import { encrypt, validate } from '../../utils/encryption.js'

//  const login=async ctx => {}

export default function(db) {
    const UserModel = db.model('User', UserSchema)

    const register = async ctx => {
        const { name, pwd, email, tel, alias, avatar, qq } = ctx.request.body
        const user = {
            name,
            alias,
            pwd,
            email,
            tel,
            qq,
            avatar
        }

        const hash = await encrypt(user.pwd)
        user.pwd = hash

        await UserModel(user)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: 'ok' }
            })
            .then(() => {
                SendEmail('用户注册:' + user.alias, JSON.stringify(user))
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: '注册失败' }
            })
    }

    const login = async ctx => {
        const { name, pwd } = ctx.request.body
        const user = await UserModel.findOne({
            name
        })
        if (!user) {
            ctx.body = {
                code: -1,
                message: '用户不存在'
            }
        } else {
            const match = await validate(pwd, user.pwd)
            if (!match) {
                ctx.body = {
                    code: -1,
                    message: '密码错误'
                }
            } else {
                let { _id, name, alia } = user
                let jwtuser = { _id, name, alia }
                const token = jwt.sign(
                    {
                        user: jwtuser
                    },
                    jwtConf.key,
                    {
                        expiresIn: 60 * 60 // token到期时间设置 单位秒
                        // expiresIn: 2 // token到期时间设置
                    }
                )
                user.token = token
                // await UserModel.update({ name: user.name }, { $set: { token: token } });
                await user
                    .save()
                    .then(() => {
                        ctx.body = {
                            code: 1,
                            message: '登陆验证成功',
                            data: { name, alias: user.alias, token }
                        }
                    })
                    .catch(err => {
                        console.error(err)
                        ctx.body = {
                            code: -1,
                            message: err.message
                        }
                    })
            }
        }
    }

    const validToken = async ctx => {
        const { name, token } = ctx.request.body
        try {
            const decoded = jwt.verify(token, jwtConf.key)
            if (decoded.exp <= Date.now() / 1000) {
                ctx.status = 301
                // ctx.redirect('/login');
                ctx.redirect('back', '/login')
                ctx.body = {
                    code: 0,
                    message: '登录状态已过期，请重新登录'
                }
                return
            }
            if (decoded) {
                ctx.body = {
                    code: 1,
                    message: '登陆验证成功'
                }
                return
            }
        } catch (error) {
            if (error) {
                console.error(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                }
            }
        }
    }

    const userInfo = async ctx => {
        const { name } = ctx.request.body
        const user = await UserModel.findOne({
            name
        })
        if (!user) {
            ctx.body = {
                code: -1,
                message: '用户不存在'
            }
        } else {
            let { name, alisename, pwd, email, tel, avatar, qq } = user
            ctx.body = {
                code: 1,
                message: '登陆验证成功',
                data: { name, alisename, pwd, email, tel, avatar, qq }
            }
        }
    }

    const userUpdate = async ctx => {
        const {
            name,
            alisename,
            pwd,
            email,
            tel,
            avatar,
            qq
        } = ctx.request.body
        const user = { name, alisename, pwd, email, tel, avatar, qq }
        const hash = await encrypt(user.pwd)
        user.pwd = hash
        await UserModel.findOneAndUpdate(
            {
                name: name
            },
            user
        )
            .then(data => {
                ctx.body = {
                    code: 1,
                    message: '修改用户成功'
                }
            })
            .catch(error => {
                console.error(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                }
            })
    }

    const userDelete = async ctx => {
        const { name } = ctx.request.body
        await UserModel.findOneAndRemove({
            name: name
        })
            .then(data => {
                if (data) {
                    ctx.body = {
                        code: 1,
                        message: data.name + '用户删除成功'
                    }
                } else {
                    console.log(data)
                    ctx.body = {
                        code: -1,
                        message: name + '用户不存在'
                    }
                }
            })
            .catch(error => {
                console.log(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                }
            })
    }

    const getAllUser = async ctx => {
        await UserModel.find()
            .then(data => {
                let arr = []
                data.map(item => {
                    arr.push({
                        name: item.name,
                        alias: item.alias,
                        id: item._id
                    })
                })
                ctx.body = { code: 1, data: arr, message: 'ok' }
            })
            .catch(error => {
                console.log(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                }
            })
    }

    return {
        register,
        login,
        validToken,
        userInfo,
        userUpdate,
        userDelete,
        getAllUser
    }
}
