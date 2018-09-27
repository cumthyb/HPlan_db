import SeriesSchema from './series.js'
import jwt from 'jsonwebtoken'

export default function(Router, db) {
    var SeriesModel = db.model('Series', SeriesSchema)

    // initCon(db)
    const router = new Router({
        prefix: '/api'
    })
    //注册用户
    router.post('/course-series/creat', async (ctx, next) => {
        const { title, desc } = ctx.request.body
        const series = { title, desc }
        await SeriesModel(series)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: '新建成功' }
            })
            .catch(error => {
                console.log(error)
                ctx.body = { code: -1, message: error.message }
            })
    })
    //注册用户
    router.get('/course-series/findAll', async (ctx, next) => {
        await SeriesModel.find()
            .then(data => {
                let arr = []
                data.map(item => {
                    arr.push({
                        value: item._id,
                        label: item.title
                    })
                })
                ctx.body = { code: 1, data: arr, message: '新建成功' }
            })
            .catch(error => {
                console.log(error)
                ctx.body = { code: -1, message: error.message }
            })
    })
    return router.routes()
}
