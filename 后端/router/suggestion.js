const express = require('express')
const router = express.Router()
const Suggestion = require('../mongoose/suggestion')

// 添加公告
router.post('/add_suggestion', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.username);
    let { content } = req.body
    const suggestion = new Suggestion({
        content,
    })
    suggestion.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("留言添加成功")
        }
    })
})

// 获取留言
router.get('/', (req, res) => {
    Suggestion.find(function (err, data) {
        if (err) {
            console.log(err);
            res.send("请求数据失败")
        }
        else {
            // console.log(data);
            res.send(data)
        }
    })
})

// 删除留言
router.post('/suggestion_delete', (req, res) => {
    console.log(req.body);
    let _id = req.body.row._id
    Suggestion.findByIdAndDelete({ "_id": _id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("删除成功")
        }
    })
})
module.exports = router