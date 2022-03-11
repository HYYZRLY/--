const express = require('express')
const router = express.Router()
const Admin = require('../mongoose/admin')
// const Admin = require('./admin')
// 引入解密模块
const bcrypt = require('bcryptjs')
// 注册
router.post('/register', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.username);
    let { username, password } = req.body
    const admin = new Admin({
        username,
        password
    })
    admin.save(function (err) {
        if (err) {
            // console.log(err);
            if (err.code === 11000) {
                res.send("用户名已存在，注册失败")
            } else {
                console.log(err);
                res.send("未知错误")
            }
        }
        else {
            res.send("success");
        }
    })
})
// 登录
router.post('/login', (req, res) => {
    console.log(req.body);
    // 查找User集合里面username为req.body.username的数据
    Admin.find({ "username": req.body.username }, function (err, data) {
        if (err) {
            console.log(err);
            res.send("遇到未知错误")
        }
        else {
            // 查询的两个分支
            // 1.查询到对应的用户
            // 2查不到对应的用户
            if (data[0] === undefined) {
                res.send("请输入正确的用户名")
            }
            else {
                // 查询到对应的用户
                // 由于通过bcrypt加密，存放在数据库中的是加密后的哈希值而不是字符串
                // 如果要进行密码对比，需要通过bcrypt插件对req.body.password进行加密，加密后的密码和数据库的密码进行比对
                // bcrypt.compareSync(req传入的密码，数据库中的哈希值)
                const flag = bcrypt.compareSync(req.body.password, data[0].password)
                if (flag) {
                    // 查询到且密码正确
                    req.session.username = req.body.username
                    // res.send({message:"登录成功",username:req.session.username})
                    // console.log(req.session.username);
                    // res.send(req.session.username) 
                    Admin.find({ 'username': req.session.username }, (err, data) => {
                        res.send({ message: '登录成功', session: req.session.username });
                    })
                }
                else {
                    // 查到了但密码错误
                    res.send("密码错误")
                }
            }
        }
    })
})

// 退出登录
router.get('/logout', (req, res) => {
    req.session.cookie.maxAge = 0
    res.send("账号已退出")
})

router.post('/register_username', (req, res) => {
    Admin.find({ "username": req.body.username }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {//查询信息没报错
            if (data[0] === undefined) {
                // 没查到对应用户
                res.send("用户名可用")
            }
            else {
                // 查到对应用户
                res.send("该用户名已注册")
            }
            console.log(data);
        }
    })
})

router.get('/', (req, res) => res.send('Hello admin!'))

module.exports = router