const express = require('express')
const router = express.Router()
const User = require('../mongoose/user')
// const UserInfo = require('../mongoose/user_info')

router.post('/register', (req, res) => {
    // console.log(req.body);
    let _openid = req.body.openid
    let username= req.body.userInfo.nickName
    let avatarUrl = req.body.userInfo.avatarUrl
    const user = new User({
        _openid,
        username,
        avatarUrl
    })
    // console.log(_openid);
    // console.log(username);
    user.save(function (err) {
        if (err) {
            // console.log(err);
            if (err.code === 11000) {
                res.send("该用户已登录")
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

router.post('/register_openid', (req, res) => {
    User.find({ "_openid": req.body.openid }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {//查询信息没报错
            if (data[0] === undefined) {
                // 没查到对应用户
                console.log("empty");
                res.send("empty")
            }
            else {
                // 查到对应用户
                res.send({message:"该用户已存在",data:data[0]})
                // res.send("该用户已存在")
            }
            console.log(data);
        }
    })
})

router.post('/', (req, res) => {
    console.log(req.body.code);
    res.send(req.body.code)
})

module.exports = router