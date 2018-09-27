import SeriesSchema from '../schema/series.js'

//  const login=async ctx => {}

export default function(db) {
    var SeriesModel = db.model('Series', SeriesSchema)

    const createSeries = async ctx => {
        const { title, desc } = ctx.request.body
        const series = { title, desc }
        await SeriesModel(series)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: '新建成功' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getAllSeries = async ctx => {
        await SeriesModel.find()
            .then(data => {
                let arr = []
                data.map(item => {
                    arr.push({
                        value: item._id,
                        label: item.title
                    })
                })
                ctx.body = { code: 1, data: arr, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }
    return { createSeries, getAllSeries }
}
