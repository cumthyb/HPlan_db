import mongoose from 'mongoose'
import koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import parser from 'koa-bodyparser'
// import connectdb from './db/dbconnection'
// import dbApis from './routes/dbApis'
import uptokenApi from './routes/qiniu_token'
import userapi from './db/schema/user/index.js'
import seriesapi from './db/schema/series/index.js'
import courseapi from './db/schema/course/index.js'

const app = new koa()

const cors_options = {
    // origin: function(ctx) {
    //     if (ctx.url === '/api') {
    //         return false;
    //     }
    //     return '*';
    // },

    // origin: function(ctx) {
    //     return 'http://127.0.0.1:3000'
    // },

    // credentials: true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Access-Control-Allow-Origin'
    ]
}
// .use(dbApis(Router))

const db_options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true
}

function connectdb() {
    return new Promise((resolve, reject) => {
        try {
            var conn = mongoose.connect(
                'mongodb://127.0.0.1:27017/hplan1',
                {},
                db_options
            )
            resolve(conn)
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

connectdb()
    .then(db => {
        app.use(cors(cors_options))
            .use(parser())
            .use(uptokenApi(Router))
            .use(userapi(Router, db))
            .use(seriesapi(Router, db))
            .use(courseapi(Router, db))
        app.listen(3011)
        console.log('====================================')
        console.log('dbServer start service at 127.0.0.1:3011')
        console.log('====================================')
    })
    .catch(error => {
        console.error(error)
    })
