const express = require('express')
const router = express.Router()
const Notice = require('../mongoose/notice')

// 添加公告
router.post('/add_notice', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.username);
    let { title, content, } = req.body
    const notice = new Notice({
        title,
        content,
    })
    notice.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("公告添加成功")
        }
    })
})

// 获取公告
router.get('/', (req, res) => {
    Notice.find(function (err, data) {
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

// 删除公告
router.post('/notice_delete', (req, res) => {
    console.log(req.body);
    let _id = req.body.row._id
    Notice.findByIdAndDelete({ "_id": _id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("删除成功")
        }
    })
})
module.exports = router