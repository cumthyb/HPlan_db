import mongoose from "mongoose";
import koa from "koa";
import cors from "koa2-cors";
import parser from "koa-bodyparser";
import dbConf from "./db/config/db2.conf";
import serverConf from "./db/config/server.conf";
import router from "./db/router/index.js";

// mongoose
//     .connect(
//         dbConf.url,
//         dbConf.conn_options
//     )
//     .then(db => {
//         const app = new koa();
//         console.log(db);
//         app.use(cors(serverConf.cors_options)).use(parser());
//         app.listen(3011);
//         console.log("====================================");
//         console.log("dbServer start service at 127.0.0.1:3011");
//         console.log("====================================");
//     })
//     .catch(error => {
//         console.error(error);
//     });

mongoose
    .createConnection(dbConf.url, dbConf.conn_options)
    .then(db => {
        console.log(db);
        console.log("数据库成功连接到：" + dbConf.url);

        new Promise((reslove, reject) => {
            const app = new koa();
            app.use(cors(serverConf.cors_options))
                .use(parser())
                .use(router(db).routes());
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

