import TaskSchema from "../schema/task.js";

//  const login=async ctx => {}

export default function(db) {
  var TaskModel = db.model("Task", TaskSchema);

  const createTask = async ctx => {
    const { course, title, desc } = ctx.request.body;
    const task = { course, title, desc };

    if (ctx.request.body._id) {
      await TaskModel.update(
        { _id: ctx.request.body._id },
        Object.assign({}, task, { utime: new Date() })
      )
        .then(data => {
          ctx.body = { code: 1, message: "ok" };
        })
        .catch(error => {
          console.error(error);
          ctx.body = { code: -1, message: error.message };
        });
    } else {
      await TaskModel(task)
        .save()
        .then(data => {
          ctx.body = { code: 1, message: "ok" };
        })
        .catch(error => {
          console.error(error);
          ctx.body = { code: -1, message: error.message };
        });
    }
  };

  const getAllTask = async ctx => {
    await TaskModel.find()
      .populate({ path: 'course', select: 'title' })
      .then(data => {
       
        ctx.body = { code: 1, data: data, message: "ok" };
      })
      .catch(error => {
        console.error(error);
        ctx.body = { code: -1, message: error.message };
      });
  };

  return { createTask, getAllTask };
}
