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
            publish
        } = ctx.request.body
        const course = {
            series,
            title,
            desc,
            coverimg,
            videourl,
            audiourl,
            publish
        }
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

    const getAllCourse = async ctx => {
        await CourseModel.find()
            .then(data => {
                let arr = []
                data.map(item => {
                    arr.push({ value: item._id, label: item.title })
                })
                ctx.body = { code: 1, data: arr, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }
    return { createCourse, getAllCourse }
}
