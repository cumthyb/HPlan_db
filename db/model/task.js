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
      .then(data => {
        let arr = [];
        data.map(item => {
          arr.push({
            value: item._id,
            label: item.title,
            desc: item.desc
          });
        });
        ctx.body = { code: 1, data: arr, message: "ok" };
      })
      .catch(error => {
        console.error(error);
        ctx.body = { code: -1, message: error.message };
      });
  };

  return { createTask, getAllTask };
}
