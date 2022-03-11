const express = require('express')
const router = express.Router()
const Info = require('../mongoose/info')
const Pay = require('../mongoose/pay')

router.post('/add_registerInfo', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.username);
    let {name,personalId,tel,doctor,department,register_time,doId,payStatus,medicalStatus,uid,week,time} = req.body
    const info = new Info({
        name,
        personalId,
        tel,
        iDoctor:doctor,
        iDepartment:department,
        register_time,
        doId,
        payStatus,
        medicalStatus,
        uid,
        week,
        time
    })
    info.save(function (err,data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({message:"success",registerData:data})
        }
    })
})

// 查找未就诊预约信息
router.get('/medicalStatus', (req, res) => {
    // console.log("Info");
    Info.find({"medicalStatus": 0},function (err, data) {
        if (err) {
            console.log(err);
            res.send("请求数据失败")
        }
        else {
            // console.log(data);
            res.send(data);
        }
    })
})
// 查找已就诊预约信息
router.get('/medicalStatus1', (req, res) => {
    // console.log("Info");
    Info.find({"medicalStatus": 1},function (err, data) {
        if (err) {
            console.log(err);
            res.send("请求数据失败")
        }
        else {
            // console.log(data);
            res.send(data);
        }
    })
})

// 修改未就诊状态
router.post('/status_edit',(req,res)=>{
    // console.log("medicalStatus_edit");
    // console.log(req.body);
    Info.findOneAndUpdate({"_id": req.body.id},{"medicalStatus":req.body.medicalStatus},function (err, data) {
        if (err) {
            console.log(err);
            res.send("请求数据失败")
        }
        else {
            // console.log(data);
            res.send("预约状态修改成功");
        }
    })

})

//根据小程序传过来的用户id获取对应的预约信息
router.get('/info_find', (req, res) => {
    // console.log("query", req.query);
    Info.find({ "uid": req.query.uid }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            res.send(data);
        }
    })
})

// 取消预约
router.post('/cancel',(req,res)=>{
    // console.log("medicalStatus_edit");
    console.log(req.body);
    Pay.findOneAndUpdate({"rid": req.body._id},{"registrationStatus":0},function (err, data){
        if (err) {
            console.log(err);
            res.send("请求数据失败")
        }
        else {
            // console.log(data);
            Info.findByIdAndDelete({"_id": req.body._id},function (err, data) {
                if (err) {
                    console.log(err);
                    res.send("请求数据失败")
                }
                else {
                    // console.log(data);
                    res.send("success");
                }
            })
        }
    })

})

// 支付后，改变支付状态
router.post('/pay',(req,res)=>{
    // console.log("medicalStatus_edit");
    console.log(req.body);
    Info.findByIdAndUpdate({"_id": req.body.register_id},{"payStatus":1},function (err, data){
        if (err) {
            console.log(err);
            res.send("更改数据失败")
        }
        else {
            // console.log(data);
            res.send("success");
        }
    })

})

module.exports = router