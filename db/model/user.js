import UserSchema from "../schema/user.js";
import jwt from "jsonwebtoken";
import SendEmail from '../../utils/email.js'

//  const login=async ctx => {}

export default function(db) {

    const UserModel = db.model('User', UserSchema)

    const register = async ctx => {
        const { name, pwd, email, tel, alias, avatar, qq } = ctx.request.body;
        const user = {
            name,
            alias,
            pwd,
            email,
            tel,
            qq,
            avatar
        };
        await UserModel(user)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: "ok" };
            }).then(()=>{
                SendEmail('用户注册:'+user.alias,JSON.stringify(user) )
            })
            .catch(error => {
                console.error(error);
                ctx.body = { code: -1, message: "注册失败" };
            });
    };

    const login = async ctx => {
        const { name, pwd } = ctx.request.body;
        const user = await UserModel.findOne({
            name
        });
        if (!user) {
            ctx.body = {
                code: -1,
                message: "用户不存在"
            };
        } else {
            if (user.pwd !== pwd) {
                ctx.body = {
                    code: -1,
                    message: "密码错误"
                };
            } else {
                const token = jwt.sign(
                    {
                        name: user.name
                    },
                    "secret",
                    {
                        expiresIn: 60 * 60 // token到期时间设置
                    }
                );
                user.token = token;
                await user.save();
                ctx.body = {
                    code: 1,
                    message: "登陆验证成功",
                    data: { name, alias: user.alias, token }
                };
            }
        }
    };

    const valid = async ctx => {
        const { name, token } = ctx.request.body;
        try {
            const decoded = jwt.verify(token, "secret");
            if (decoded.exp <= Date.now() / 1000) {
                ctx.body = {
                    code: 0,
                    message: "登录状态已过期，请重新登录"
                };
                return;
            }
            if (decoded) {
                // token is ok
                ctx.body = {
                    code: 1,
                    message: "登陆验证成功"
                };
                return;
            }
        } catch (error) {
            if (error) {
                console.error(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                };
            }
        }
    };

    const userInfo = async ctx => {
        const { name } = ctx.request.body;
        const user = await UserModel.findOne({
            name
        });
        if (!user) {
            ctx.body = {
                code: -1,
                message: "用户不存在"
            };
        } else {
            let { name, alisename, pwd, email, tel, avatar, qq } = user;
            ctx.body = {
                code: 1,
                message: "登陆验证成功",
                data: { name, alisename, pwd, email, tel, avatar, qq }
            };
        }
    };

    const userUpdate = async ctx => {
        const {
            name,
            alisename,
            pwd,
            email,
            tel,
            avatar,
            qq
        } = ctx.request.body;
        const user = { name, alisename, pwd, email, tel, avatar, qq };
        await UserModel.findOneAndUpdate(
            {
                name: name
            },
            user
        )
            .then(data => {
                ctx.body = {
                    code: 1,
                    message: "修改用户成功"
                };
            })
            .catch(error => {
                console.error(error)
                ctx.body = {
                    code: -1,
                    message: error.message
                };
            });
    };

    const userDelete = async ctx => {
        const { name } = ctx.request.body;
        await UserModel.findOneAndRemove({
            name: name
        })
            .then(data => {
                if (data) {
                    ctx.body = {
                        code: 1,
                        message: data.name + "用户删除成功"
                    };
                } else {
                    console.log(data);
                    ctx.body = {
                        code: -1,
                        message: name + "用户不存在"
                    };
                }
            })
            .catch(error => {
                console.log(error);
                ctx.body = {
                    code: -1,
                    message: error.message
                };
            });
    };

    return { register, login, valid, userInfo, userUpdate, userDelete };
}
