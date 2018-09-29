# 简介
花生写作课后端系统

# 项目基础
node v10.8
mongodb

# 代码结构

```
|-- HPlan_db
    |-- .babelrc
    |-- .gitignore
    |-- README.md
    |-- app.js
    |-- db.html         数据库设计文件
    |-- db.pdman.json   pdman软件导出的数据库设计json
    |-- index.js 启动文件
    |-- package-lock.json
    |-- package.json
    |-- .vscode
    |   |-- launch.json
    |-- config  
    |   |-- db.conf
    |   |-- db2.conf    数据库配置文件
    |   |-- email.conf  邮件发送配置文件
    |   |-- jwt.conf    jwttoken生成配置文件
    |   |-- nginx.conf  开发环境nginx配置文件
    |   |-- qiniu.conf  七牛云配置文件
    |   |-- server.conf nodejs服务配置文件
    |-- db
    |   |-- model       
    |   |   |-- comment.js
    |   |   |-- course.js
    |   |   |-- order.js
    |   |   |-- paper.js
    |   |   |-- role.js
    |   |   |-- series.js
    |   |   |-- task.js
    |   |   |-- user.js
    |   |-- router      路由配置
    |   |   |-- index.js
    |   |   |-- qiniu_token.js
    |   |-- schema      库表设计
    |       |-- comment.js
    |       |-- course.js
    |       |-- order.js
    |       |-- paper.js
    |       |-- role.js
    |       |-- series.js
    |       |-- task.js
    |       |-- user.1.js
    |       |-- user.js
    |-- utils           基础工具类文件
        |-- email.js    邮件发送


```


# 运行
node index.js
