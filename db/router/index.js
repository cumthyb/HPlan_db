import Router from "koa-router";
import User from "../model/user.js";

function createRouter(db) {
    const router = new Router();
    router.get("/", User.keepLog);
    return router;
}

export default createRouter;
