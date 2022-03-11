const express = require('express')
const app = express()
const port = 5000
const path = require('path')
// const cors = require('cors')
const session = require("express-session")
const admin = require('./router/admin')
const user = require('./router/user')
const department = require('./router/department')
const doctor = require('./router/doctor')
const info = require('./router/info')
const roster = require('./router/roster')
const pay = require('./router/pay')
const notice = require('./router/notice')
const suggestion = require('./router/suggestion')
var bodyParser = require('body-parser')
// 
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081"); //表示允许哪个服务器进行访问
    res.header('Access-Control-Allow-Credentials', true); //表示允许携带cookie  允许前端携带cookie请求 允许前端接收响应的cookie
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
})

app.use(session({
    secret: "this is session",//生成session签名
    resave: false, //强制保存session
    saveUninitialized: true, //强制保存尚未初始化的session
    name: "sessionID",//设置cookie的key
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

// app.use(cors()) //引入cors中间件处理跨域
app.use(express.json())//引入内置中间件处理json数据
app.use('/public', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(req.session)
})

// 相当于做了一个二级目录
// 第一个参数是二级路由名称 第二个参数是对应的路由模块
app.use('/user', user)
app.use('/admin', admin)
// app.use((req, res, next) => {
//     if (req.session.username == undefined) {
//         res.send("请登录后再请求数据")
//     }
//     else {
//         next()
//     }
// })
app.use('/department', department)
app.use('/doctor', doctor)
app.use('/info', info)
app.use('/roster', roster)
app.use('/pay', pay)
app.use('/notice', notice)
app.use('/suggestion', suggestion)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))