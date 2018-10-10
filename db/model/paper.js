import PaperSchema from "../schema/paper.js";

//  const login=async ctx => {}

export default function(db) {
  PaperSchema.virtual("hascorrected").get(function() {
    return this.correcttimes >= this.submittimes;
  });

  var PaperModel = db.model("Paper", PaperSchema);

  const createPaper = async ctx => {
    const { task, member, content } = ctx.request.body;
    const paper = { task, member, content };

    await PaperModel(paper)
      .save()
      .then(data => {
        ctx.body = { code: 1, message: "ok" };
      })
      .catch(error => {
        console.error(error);
        ctx.body = { code: -1, message: error.message };
      });
  };

  const getPaperById = async ctx => {
    if (ctx.request.query.id) {
      await PaperModel.findById(ctx.request.query.id)
        .populate({ path: "member", select: "alias" })
        .populate({ path: "member", select: "alias" })
        .populate({ path: "task", select: "title" })
        .then(data => {
          ctx.body = { code: 1, data: data, message: "ok" };
        })
        .catch(error => {
          console.error(error);
          ctx.body = { code: -1, message: error.message };
        });
    } else {
      ctx.body = { code: -1, message: "_id不存在" };
    }
  };

  const modifyPaper = async ctx => {
    const { task, member, content } = ctx.request.body;
    const paper = { task, member, content };

    if (ctx.request.body._id) {
      await PaperModel.findOneAndUpdate(
        { _id: ctx.request.body._id },
        Object.assign({}, paper, { modifytime: new Date() })
      )
        .update({ $inc: { submittimes: 1 } })
        .then(data => {
          ctx.body = { code: 1, message: "ok" };
        })
        .catch(error => {
          console.error(error);
          ctx.body = { code: -1, message: error.message };
        });
    } else {
      ctx.body = { code: -1, message: "_id不存在" };
    }
  };

  const getAllPaper = async ctx => {
    await PaperModel.find(
      "task member submittime modifytime corrector correctime hascorrected"
    )
      .populate({ path: "member", select: "alias" })
      .populate({ path: "member", select: "alias" })
      .populate({ path: "task", select: "title" })
      .sort({ submittime: -1, modifytime: -1, correcttime: -1 })
      .then(data => {
        ctx.body = { code: 1, data: data, message: "ok" };
      })
      .catch(error => {
        console.error(error);
        ctx.body = { code: -1, message: error.message };
      });
  };

  const correctPaper = async ctx => {
    const { corrector, correctcontent, comment } = ctx.request.body;
    const paper = { corrector, correctcontent, comment };

    if (ctx.request.body._id) {
      await PaperModel.findOneAndUpdate(
        { _id: ctx.request.body._id },
        Object.assign({}, paper, { correcttime: new Date() })
      )
        .update({ $inc: { correcttimes: 1 } })
        .then(data => {
          ctx.body = { code: 1, message: "ok" };
        })
        .catch(error => {
          console.error(error);
          ctx.body = { code: -1, message: error.message };
        });
    } else {
      ctx.body = { code: -1, message: "_id不存在" };
    }
  };

  return { createPaper, modifyPaper, getPaperById, getAllPaper, correctPaper };
}
