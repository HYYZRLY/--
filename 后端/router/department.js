const express = require('express')
const router = express.Router()

const Department = require('../mongoose/department')
const Doctor = require('../mongoose/doctor')
const Roster = require('../mongoose/roster')
const fs = require('fs')


// 添加科室
router.post('/department_add', (req, res) => {
    // console.log(req.body);
    const department = new Department({
        department: req.body.department,
        department_addr: req.body.department_addr,
        introduction:req.body.introduction
    })
    department.save(function (err) {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                res.send("该科室已存在")
            } else {
                res.send("未知错误")
            }
        }
        else {
            res.send("科室添加成功")
        }
    })
})
// 查找科室
router.get('/', (req, res) => {
    // console.log("department");
    Department.find(function (err, data) {
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

// 查找单个科室
router.post('/departmentInfo',(req, res) => {
    console.log(req.body.id);
    Department.find({ '_id': req.body.id },function (err, data) {
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

// 删除科室
router.post('/department_delete',(req,res)=>{
    // console.log(req.body);
    Department.findByIdAndDelete({ '_id': req.body.row._id }, function (err, data){
        if(err){
            console.log(err);
        }
        else{
            Doctor.find({ 'deId': req.body.row._id }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(data);
                    let doctor_data = data
                    let doctorPicList = doctor_data.map((item) => {
                        doctor_pic = item.doctor_pic.substr(22)
                        console.log(doctor_pic);
                        return doctor_pic
                    })
                    console.log(doctorPicList);
                    doctorPicList.forEach(element => {
                        console.log(element);
                        // 删除本地图片文件
                        fs.unlink(element, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("删除文件成功");
                            }
                        })
                    });
                    Doctor.deleteMany({ 'deId': req.body.row._id }, function (err, data) {
                        if (err) {
                            console.log(err);
                            // res.send("删除数据失败")
                        }
                        else {
                            console.log("删除医生成功");
                        }
                    })
                    let doctorIdList = doctor_data.map((item) => {
                        _id = item._id
                        // console.log(_id);
                        return _id
                    })
                    doctorIdList.forEach(e => {
                        // console.log("e");
                        // console.log(e);
                        Roster.find({ 'doId': e }, (err, data) => {
                            if (err) {
                                console.log(err);
                                // res.send("删除数据失败")
                            }
                            else {
                                Roster.deleteMany({ 'doId': e }, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        // res.send("删除数据失败")
                                    }
                                    else {
                                        console.log('删除出诊成功');
                                    }
                                })
                            }
                        })
                    })
                }
            })
            res.send("科室删除成功")
        }
    })
})

// 编辑科室
router.post('/department_edit',(req,res)=>{
    // console.log(req.body);
    Department.find({ '_id': req.body.row._id }, function (err, data){
        if(err){
            console.log(err);
        }
        else{
            // console.log(data);
            res.send(data)
        }
    })
})
// 更新科室
router.post('/department_update',(req,res)=>{
    // console.log(req.body);
    const { name, addr, introduction, id } = req.body
    Department.find({ '_id': id }, function (err, data){
        if(err){
            console.log(err);
        }
        else{
            // console.log(id);
            Department.updateOne({'_id': id},{'department':name, 'department_addr':addr, introduction},function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('修改科室成功');
                    res.send("修改科室成功")
                }
            })
        }
    })
})

//根据小程序传过来的科室id查找科室信息
router.get('/departmentData', (req, res) => {
    // console.log("query", req.query);
    Department.find({ "_id": req.query._id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
})

module.exports = router