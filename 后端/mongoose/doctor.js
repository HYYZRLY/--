const mongoose = require('./db')
const { Schema } = require('mongoose')

const DoctorSchema = mongoose.Schema({
    doctor:String,    // 医生名
    doctor_pic:String, //图片地址
    deId:Schema.Types.ObjectId, //映射到科室表id
    doctorNum:{ //工号
        type:Number,
        unique:true
    },
    introduction:String,    // 简介
    titles:String,//职称
    add_time:{
        type:Date,
        default:Date.now(),
    }
},{
    versionKey:false//不添加版本后
})

const Doctor = mongoose.model("Doctor",DoctorSchema,"Doctor")
module.exports = Doctor