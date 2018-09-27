import Router from 'koa-router'
import UserModel from '../model/user.js'
import SeriesModel from '../model/series.js'
import CourseModel from '../model/course.js'

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

    const Series = SeriesModel(db)
    router.post('/course-series/creat', Series.createSeries)
    router.get('/course-series/findAll', Series.getAllSeries)


    const Course = CourseModel(db)
    router.post('/course/create', Course.createCourse) 
    router.post('/course/findAll', Course.getAllCourse) 

    return router
}

export default createRouter
