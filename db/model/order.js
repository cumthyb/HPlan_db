import OrderSchema from '../schema/order.js'

//  const login=async ctx => {}

export default function(db) {
    var OrderModel = db.model('Order', OrderSchema)

    const createOrder = async ctx => {
        const { member, course, amount, paytime, paychannel } = ctx.request.body
        const order = {
            member,
            course,
            amount,
            paytime,
            paychannel
        }
        order.startdate = ctx.request.body.validityPeriod[0]
        order.enddate = ctx.request.body.validityPeriod[0]

        await OrderModel(order)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getAllOrder = async ctx => {
        await OrderModel.find()
            .sort({ ctime: -1 })
            .populate({ path: 'member', select: 'alias' })
            .populate({ path: 'course', select: 'title' })
            .then(data => {
                ctx.body = { code: 1, data: data, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getOrder = async ctx => {
        let id = ctx.request.query.id
        await OrderModel.findById(id)
            .then(data => {
                ctx.body = { code: 1, data: data, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getUserCourse = async ctx => {
        let userName = ctx.cookies.get('name')
        let o = 10
        await OrderModel.find()
            .populate({ path: 'member', select: '_id name' })
            .populate({
                path: 'course',
                select: '_id title desc coverimg videourl'
            })
            .then(data => {
                let arr = []
                data.filter(item => item.member.name === userName).map(item => {
                    let { _id, title, desc, coverimg, videourl } = item.course
                    let course = { _id, title, desc, coverimg, videourl }
                    arr.push(course)
                })
                ctx.body = { code: 1, data: arr, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    return { createOrder, getAllOrder, getOrder, getUserCourse }
}
