import CommentSchema from '../schema/comment.js'

//  const login=async ctx => {}

export default function(db) {
    var CommentModel = db.model('Comment', CommentSchema)

    const createComment = async ctx => {
        const { course, member,paper,content,rate } = ctx.request.body
        const comment = { course, member,paper,content,rate }
        comment.ctime=new Date()
        await CommentModel(comment)
            .save()
            .then(data => {
                ctx.body = { code: 1, message: '新建成功' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }

    const getAllComment = async ctx => {
        await CommentModel.find()
            .then(data => {
                ctx.body = { code: 1, data: data, message: 'ok' }
            })
            .catch(error => {
                console.error(error)
                ctx.body = { code: -1, message: error.message }
            })
    }
    return { createComment, getAllComment }
}
