const express = require('express');
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const Doctor = require('../mongoose/doctor')
const Department = require('../mongoose/department')
const Roster = require('../mongoose/roster')

// 实力化upload
const upload = multer({
    // 设置文件存储位置
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let date = new Date();
            let year = date.getFullYear();  //获取年份
            // padStart,不满位数时，会在头部或尾部补全
            // getMonth()+1 getMonth数值是从0-11
            let month = (date.getMonth() + 1).toString().padStart(2, "0")
            let day = date.getDate()
            let dir = 'public/uploads/' + year + month + day
            // 判断目录是否存在，没有则创建
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }
            // dir就是上传文件存放的目录
            cb(null, dir)
        },
        // 设置文件名(multer)无法预知我们上传的文件类型
        filename: function (req, file, cb) {
            let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            // fileName就是上传文件的文件名
            cb(null, fileName)
        }
    })
})

// 添加医生
router.post('/doctor_add', upload.single("img"), (req, res) => {
    console.log(req.body);
    // console.log(req.file);
    const imgUrl = "http://localhost:5000/" + req.file.destination + '/' + req.file.filename
    console.log(imgUrl);
    Department.find({ "department": req.body.department }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data[0]._id);
            const doctor = new Doctor({
                doctor: req.body.doctor,
                doctor_pic: imgUrl,
                deId: data[0]._id,
                introduction: req.body.introduction,
                doctorNum: req.body.doctorNum,
                total: req.body.total,
                registrationNum: req.body.registrationNum,
                titles: req.body.titles
            })
            doctor.save(function (err, data) {
                if (err) {
                    if (err.code === 11000) {
                        res.send("该工号已存在，添加失败")
                    } else {
                        console.log(err);
                        res.send("未知错误")
                    }
                }
                else {
                    console.log("添加医生成功");
                    // console.log(data);
                }
            })
        }
    })
    res.redirect('http://localhost:8081/doctor');
})

// 删除医生
router.post('/doctor_delete', (req, res) => {
    // console.log(req.body);
    pic_name = req.body.row.doctor_pic;
    pic_name = pic_name.substr(22)
    // console.log(pic_name);
    Doctor.findOneAndDelete({ '_id': req.body.row._id }, function (err, data) {
        if (err) {
            console.log(err);
            res.send("删除数据失败")
        }
        else {
            // 删除本地图片文件
            fs.unlink(pic_name, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("删除文件成功");
                }
            })
            let doId = req.body.row._id
            Roster.deleteMany({ 'doId': doId }, function (err, data) {
                if (err) {
                    console.log(err);
                    // res.send("删除数据失败")
                }
                else {
                    console.log('删除出诊成功');
                }
            })
            console.log("删除成功");
            res.send("删除成功")
        }
    });
})

// 查找医生
router.get('/', (req, res) => {
    // console.log("doctor");
    Doctor.aggregate([
        {
            $lookup: {
                from: "Department",
                localField: "deId",
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

// 编辑医生
router.post('/doctor_update', upload.single("img"), (req, res) => {
    console.log(req.body);
    // console.log(req.file);
    const imgUrl = "http://192.168.43.212:5000/" + req.file.destination + '/' + req.file.filename
    console.log(imgUrl);
    Doctor.find({ doctorNum: req.body.doctorNum }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            pic_name = data[0].doctor_pic;
            pic_name = pic_name.substr(22)
            // 删除本地图片文件
            fs.unlink(pic_name, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("删除图片成功");
                }
            })
            Department.find({ "department": req.body.department }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(data[0]._id);
                    const { doctor, introduction, total, registrationNum, titles } = req.body
                    const deId = data[0]._id
                    Doctor.updateOne({ doctorNum: req.body.doctorNum },
                        { doctor, introduction, deId, doctor_pic: imgUrl, total, registrationNum, titles },
                        function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("信息修改成功");
                                // res.send("信息修改成功")
                            }
                        })
                }
            })
        }
    })
    res.redirect('http://localhost:8081/doctor');
})

//根据小程序传过来的分类id获取对应的医生
router.get('/doctor_find', (req, res) => {
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
router.get('/doctor-detail', (req, res) => {
    // console.log("query", req.query);
    Doctor.find({ "_id": req.query._id }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            Department.find({ "_id": data[0].deId }, function (err, data1) {
                if (err) {
                    console.log(err);
                }
                else {
                    // console.log(data1);
                    Roster.find({ "doId": req.query._id }, function (err, data2) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.send({ doctor: data, department: data1, roster: data2 })
                        }
                    })
                }
            })
        }
    })
})

module.exports = router