import UserSchema from './user.js'
import jwt from 'jsonwebtoken'


export default function (Router,db) {

    var UserModel = db.model('User', UserSchema)

    // initCon(db)
    const router = new Router({
        prefix: '/api'
    })
    //注册用户
    router.post('/member/register', async (ctx, next) => {
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
        await UserModel(user)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: '注册成功' }
            })
            .catch(error => {
                console.log(error)
                ctx.body = { code: -1, message: '注册失败' }
            })
    })

    //用户登陆
    router.post('/member/login', async (ctx, next) => {
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
            if (user.pwd !== pwd) {
                ctx.body = {
                    code: -1,
                    message: '密码错误'
                }
            } else {
                const token = jwt.sign(
                    {
                        name: user.name
                    },
                    'secret',
                    {
                        expiresIn: 60 * 60 // token到期时间设置
                    }
                )
                user.token = token
                await user.save()
                ctx.body = {
                    code: 1,
                    message: '登陆验证成功',
                    data: { name, alias: user.alias, token }
                }
            }
        }
    })

    //token 验证
    router.post('/valid', async (ctx, next) => {
        const { name, token } = ctx.request.body
        try {
            const decoded = jwt.verify(token, 'secret')
            if (decoded.exp <= Date.now() / 1000) {
                ctx.body = {
                    code: 0,
                    message: '登录状态已过期，请重新登录'
                }
                return
            }
            if (decoded) {
                // token is ok
                ctx.body = {
                    code: 1,
                    message: '登陆验证成功'
                }
                return
            }
        } catch (error) {
            if (error) {
                ctx.body = {
                    code: -1,
                    message: error.message
                }
            }
        }
    })
    //用户信息
    router.post('/member/info', async (ctx, next) => {
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
    })
    //用户修改
    router.post('/member/update', async (ctx, next) => {
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
                console.log(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                }
            })
    })

    //用户删除
    router.post('/delete', async (ctx, next) => {
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
    })

    return router.routes()
}
