const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const sd = require("silly-datetime");


const app = express();

// 自定义跨域中间件//使用跨域中间件
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// 存储数据库的所有模型
global.mongoModel = {};


//配置ejs格式文件
app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.locals.sd = sd;
// post请求数据处理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// session配置
app.use(session({
    secret: "iloveyou", //验证data+key
    resave: false,
    saveUninitialized: false
}))

app.use(express.static("./public"))
app.use("/uploads", express.static("./uploads"))
    //创建一个服务器
    //前台模块
//app.use('/', require("./routers/Main")); //传统的开发方式
app.use(express.static("./dist"));   //前后台分离开发方式

// 后台模块
app.use('/admin', require("./routers/Admin"));

// Api模块
app.use('/api', require("./routers/Api"));

mongoose.connect("mongodb://127.0.0.1:27017/adminAccount", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw Error(err);
        console.log("数据库连接失败");
    } else {
        app.listen(3000, () => {
            console.log('你当前访问的是:http://127.0.0.1:3000/');
        })
    }
})