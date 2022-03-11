const express = require('express')
const router = express.Router()
const Roster = require('../mongoose/roster')
const Doctor = require('../mongoose/doctor')
const Department = require('../mongoose/department')

router.post('/add_roster', (req, res) => {
    // console.log(req.body);
    // console.log(req.body.username);
    let { doId, total, registrationNum, week, time } = req.body.form_roster
    const roster = new Roster({
        doId,
        total,
        registrationNum,
        week,
        time
    })
    // console.log(roster);
    roster.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("success");
        }
    })
})

// 查找出诊信息
router.get('/', (req, res) => {
    // console.log("doctor");
    Roster.aggregate([
        {
            $lookup: {
                from: "Doctor",
                localField: "doId",
                foreignField: "_id",
                as: "doctor_data"
            }
        },
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

//根据小程序传过来的分类id获取对应的出诊医生
router.get('/roster_find', (req, res) => {
    // console.log("query", req.query);
    Doctor.find({ "deId": req.query.deId }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            res.send(data);
        }
    })
})

// 根据小程序传过来的医生id获取对应的医生
router.get('/roster-detail', (req, res) => {
    // console.log("query", req.query);
    Roster.find({ "_id": req.query._id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            Doctor.find({ "_id": data[0].doId }, function (err, data1) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(data1);
                    Department.find({"_id": data1[0].deId},function(err,data2){
                        if (err) {
                            console.log(err);
                        }
                        else{
                            res.send({roster:data,doctor:data1,department:data2})
                        }
                    })
                }
            })
        }
    })
})

// 预约数加一
router.post('/addNum', (req, res) => {
    console.log(req.body);
    // console.log(req.body.registrationNum);
    let {registrationNum,time_id} = req.body
    Roster.findByIdAndUpdate({"_id":time_id},{"registrationNum":registrationNum},function (err, data){
        if(err){
            console.log(err);
        }
        else{
            res.send("success")
        }
    })
})

// 预约数减一
router.post('/subNum', (req, res) => {
    console.log(req.body);
    // console.log(req.body.registrationNum);
    let {doId} = req.body
    Roster.find({"doId":doId},function (err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    })
})

// 删除出诊
router.post('/delete',(req,res)=>{
    console.log(req.body);
    Roster.findByIdAndDelete({"_id":req.body.row._id},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log("删除出诊成功");
            res.send("删除成功")
        }
    })
})

module.exports = router