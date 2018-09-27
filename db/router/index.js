import Router from 'koa-router'
import UserModel from '../model/user.js'

function createRouter(db) {
    const router = new Router({
        prefix: '/api'
    })
    const User = UserModel(db)

    router.post('/member/register', User.register)
    router.post('/member/login', User.login)
    router.post('/valid', User.valid)
    router.post('/member/info', User.userInfo)
    router.post('/member/update', User.userUpdate)
    router.post('/member/delete', User.userDelete)

    return router
}

export default createRouter
