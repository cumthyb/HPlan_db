import CourseSchema from '../schema/course.js'

//  const login=async ctx => {}

export default function(db) {
    var CourseModel = db.model('Course', CourseSchema)

    const createCourse = async ctx => {
        const {
            series,
            title,
            desc,
            coverimg,
            videourl,
            audiourl,
            publish,
            price,
            discount
        } = ctx.request.body
        const course = {
            series,
            title,
            desc,
            coverimg,
            videourl,
            audiourl,
            publish,
            price,
            discount
        }

        if (ctx.request.body._id) {
           
            await CourseModel.findOneAndUpdate(
                { _id: ctx.request.body._id },
                Object.assign({}, course, { utime: new Date() })
            )
                .then(data => {
                    ctx.body = { code: 1, message: 'ok' }
                })
                .catch(error => {
                    console.error(error)
                    ctx.body = { code: -1, message: error.message }
                })
        } else {
            await CourseModel(course)
                .save()
                .then(data => {
                    ctx.body = { code: 1, message: 'ok' }
                })
                .catch(error => {
                    console.error(error)
                    ctx.body = { code: -1, message: error.message }
                })
        }
    }

    const getAllCourse = async ctx => {
        await CourseModel.find()
            .populate({ path: 'series', select: 'title' })
            .sort({ ctime: -1 })
            .then(data => {
                ctx.body = { code: 1, data: data, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getCourse = async ctx => {
        let id = ctx.request.query.id
        await CourseModel.findById(id)
            .then(data => {
                ctx.body = { code: 1, data: data, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    return { createCourse, getAllCourse, getCourse }
}
