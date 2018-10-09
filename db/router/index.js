import Router from 'koa-router'
import Qiniu from './qiniu_token.js'
import UserModel from '../model/user.js'
import SeriesModel from '../model/series.js'
import CourseModel from '../model/course.js'
import OrderModel from '../model/order.js'

function createRouter(db) {
    const router = new Router({
        prefix: '/api'
    })

    router.get('/uptoken', Qiniu().qiniutoken)

    const User = UserModel(db)
    router.post('/member/register', User.register)
    router.post('/member/login', User.login)
    router.post('/valid', User.valid)
    router.post('/member/info', User.userInfo)
    router.post('/member/update', User.userUpdate)
    router.post('/member/delete', User.userDelete)
    router.post('/member/findAll', User.getAllUser)

    const Series = SeriesModel(db)
    router.post('/course-series/creat', Series.createSeries)
    router.get('/course-series/findAll', Series.getAllSeries)

    const Course = CourseModel(db)
    router.post('/course/create', Course.createCourse)
    router.get('/course/findAll', Course.getAllCourse)
    router.get('/course/find', Course.getCourse)
    router.get('/course/findBySeries', Course.getCourseBySeries)

    const Order = OrderModel(db)
    router.post('/order/create', Order.createOrder)
    router.get('/order/findAll', Order.getAllOrder)

    return router
}

export default createRouter
