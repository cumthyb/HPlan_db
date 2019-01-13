import mongoose from "mongoose";
import koa from "koa";
import cors from "koa2-cors";
import parser from "koa-bodyparser";
import dbConf from "./config/db2.conf";
import serverConf from "./config/server.conf";
import routes from "./db/router/index.js";
import session from "koa-session";

mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);

mongoose
  .createConnection(dbConf.url, dbConf.conn_options)
  .then(db => {
    // console.log(db)
    console.log("数据库成功连接到：" + dbConf.url);

    new Promise((reslove, reject) => {
      const app = new koa();

      app.keys = ["keys", "secret", "hplan"]; /*cookie的签名*/
      const CONFIG = {
        key: "koa:sess" /** 默认 */,
        maxAge: 86400000 /*  cookie的过期时间   单位毫秒     【需要修改】  */,
        overwrite: true /** (boolean) can overwrite or not (default true)    没有效果，默认 */,
        httpOnly: true /**  true表示只有服务器端可以获取cookie */,
        signed: true /** 默认 签名 */,
        rolling: true /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */,
        renew: false /** (boolean) renew session when session is nearly expired      【需要修改】*/
      };
      app.use(session(CONFIG, app));

      app.use(cors(serverConf));

      const unless = [
        "/api/member/login",
        "/api/member/register",
        "/api/course-series/findAll",
        "/api/course/findBySeries"
      ];

      //拦截鉴权
      app.use(function(ctx, next) {
        console.log("ctx: ",new Date())
        console.log("ctx: ",ctx)
        if (!ctx.session.user && !unless.includes(ctx.path.split("?")[0])) {
          ctx.status = 401;
          ctx.body = {
            code: -1,
            message: "登录状态已过期，请重新登录"
          };
          return;
        } else {
          return next();
        }
      });

      let router = routes(db);
      app
        .use(
          parser({
            formLimit: "5mb",
            jsonLimit: "5mb",
            textLimit: "5mb"
          })
        )
        .use(router.routes())
        .use(router.allowedMethods());
      app.listen(3011);
      reslove();
    })
      .then(() => {
        console.log("====================================");
        console.log("dbServer start service at 127.0.0.1:3011");
        console.log("====================================");
      })
      .catch(e => {
        console.error("服务启动失败" + e);
      });
  })
  .catch(e => {
    console.error(dbConf.url);
    console.error("数据库连接失败：" + e);
  });
