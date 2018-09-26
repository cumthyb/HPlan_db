import CourseSchema from './course.js'

export default function (Router, db) {
    var CourseModel = db.model('Course', CourseSchema)

    // initCon(db)
    const router = new Router({
        prefix: '/api'
    })
    //注册用户
    router.post('/course/create', async (ctx, next) => {
        const { series,title, desc, coverimg, videourl, audiourl, publish } = ctx.request.body
        const course = { series,title, desc, coverimg, videourl, audiourl, publish }
        await CourseModel(course)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: 'ok' }
            })
            .catch(error => {
                ctx.body = { code: -1, message: error.message }
            })
    })
    //注册用户
    router.get('/course/findAll', async (ctx, next) => {
        await CourseModel.find()
            .then(data => {
                let arr = []
                data.map(item => {
                    arr.push({ value: item._id, label: item.title })
                })
                ctx.body = { code: 1, data: arr, message: 'ok' }
            })
            .catch(error => {
                ctx.body = { code: -1, message: error.message }
            })
    })
    return router.routes()
}
