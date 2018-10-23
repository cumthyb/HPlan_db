import PaperSchema from '../schema/paper.js'

//  const login=async ctx => {}

export default function(db) {
    PaperSchema.virtual('hascorrected').get(function() {
        return this.correcttimes >= this.submittimes
    })

    var PaperModel = db.model('Paper', PaperSchema)

    const createPaper = async ctx => {
        const { task, content } = ctx.request.body
        const paper = { task, content }
        paper.member = ctx.session.user._id

        await PaperModel(paper)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getByPaperId = async ctx => {
        if (ctx.request.query.id) {
            await PaperModel.findById(ctx.request.query.id)
                .populate({ path: 'member', select: 'alias' })
                .populate({ path: 'task', select: 'title' })
                .then(data => {
                    ctx.body = { code: 1, data: data, message: 'ok' }
                })
                .catch(error => {
                    console.error(error)
                    ctx.body = { code: -1, message: error.message }
                })
        } else {
            ctx.body = { code: -1, message: '_id不存在' }
        }
    }

    const getPaperByTask = async ctx => {
        if (ctx.request.query.task) {
            let param = {
                task: ctx.request.query.task,
                member: ctx.session.user._id
            }
            await PaperModel.find(param)
                .populate({ path: 'member', select: 'alias' })
                .populate({ path: 'task', select: 'title desc' })
                .then(data => {
                    ctx.body = { code: 1, data: data[0], message: 'ok' }
                })
                .catch(error => {
                    console.error(error)
                    ctx.body = { code: -1, message: error.message }
                })
        } else {
            ctx.body = { code: -1, message: '_id不存在' }
        }
    }

    const modifyPaper = async ctx => {
        const { task, content } = ctx.request.body
        const paper = { task, content }
        paper.member = ctx.session.user._id
        if (ctx.request.body._id) {
            await PaperModel.update(
                { _id: ctx.request.body._id },
                {
                    $inc: { submittimes: 1 },
                    $set: Object.assign({}, paper, { modifytime: new Date() })
                }
            )
                .then(data => {
                    ctx.body = { code: 1, message: 'ok' }
                })
                .catch(error => {
                    console.error(error)
                    ctx.body = { code: -1, message: error.message }
                })
        } else {
            await PaperModel(paper)
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

    const getAllPaper = async ctx => {
        await PaperModel.find(
            'task member submittime modifytime corrector correctime hascorrected'
        )
            .populate({ path: 'member', select: 'alias' })
            .populate({ path: 'task', select: 'title' })
            .sort({ submittime: -1, modifytime: -1, correcttime: -1 })
            .then(data => {
                ctx.body = { code: 1, data: data, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const correctPaper = async ctx => {
        const { correctcontent, comment } = ctx.request.body
        const paper = { correctcontent, comment }
        paper.corrector = ctx.session.user._id
        if (ctx.request.body._id) {
            await PaperModel.update(
                { _id: ctx.request.body._id },
                {
                    $inc: { correcttimes: 1 },
                    $set: Object.assign({}, paper, { correcttime: new Date() })
                }
            )
                .then(data => {
                    ctx.body = { code: 1, message: 'ok' }
                })
                .catch(error => {
                    console.error(error)
                    ctx.body = { code: -1, message: error.message }
                })
        } else {
            ctx.body = { code: -1, message: '_id不存在' }
        }
    }

    return {
        createPaper,
        modifyPaper,
        getByPaperId,
        getPaperByTask,
        getAllPaper,
        correctPaper
    }
}
