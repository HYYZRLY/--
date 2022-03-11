const express = require('express')
const router = express.Router()
const Pay = require('../mongoose/pay')
const Info = require('../mongoose/info')
let mongoose = require("mongoose")

router.post('/pay', (req, res) => {
    console.log(req.body);
    // console.log(req.body.username);
    let {name,doctor,department,register_time,medicalStatus,uid,week,time,register_id} = req.body
    const pay = new Pay({
        rid:register_id,
        name,
        iDoctor:doctor,
        iDepartment:department,
        register_time,
        medicalStatus,
        uid,
        week,
        time
    })
    pay.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ message: "success", registerData: data })
        }
    })
})

//根据小程序传过来的用户id获取对应的预约信息
router.get('/pay_find', (req, res) => {
    // console.log("query", req.query);
    let uid = req.query.uid
    // console.log(uid);
    Pay.aggregate([
        // {
        //     $match: {
        //         uid: uid
        //     }
        // },
        {
            $lookup: {
                from: "Info",
                localField: "rid",
                foreignField: "_id",
                as: "pay_data"
            }
        },
        {
            $match: {
                "uid": mongoose.Types.ObjectId(uid)
            }
        }
        // {
        //     $skip: skip
        // },
        // {
        //     $limit: 10
        // }
    ], function (err, data) {
        // console.log(data);
        res.send(data)
    })
})

//根据小程序传过来的用户id获取对应的预约支付信息
router.get('/info_find', (req, res) => {
    // console.log("query", req.query);
    Pay.find({ "uid": req.query.uid }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            res.send(data);
        }
    })
})

module.exports = router