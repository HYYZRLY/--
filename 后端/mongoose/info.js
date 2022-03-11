// 用户相关处理
const mongoose = require('./db')
const { Schema } = require('mongoose')

const InfoSchema = new mongoose.Schema({
    uid:Schema.Types.ObjectId, //映射到用户表id
    name:{
        type:String,
    },
    personalId:String,
    tel:String,
    iDoctor:String,
    doId:Schema.Types.ObjectId, //映射到医生表id
    iDepartment:String,
    register_time:{
        type:Date,
        default:Date.now()
    },
    payStatus:Number,
    medicalStatus:Number,
    week:String,
    time:String,
    add_time:{
        type:Date,
        default:Date.now()
    }
},{
    versionKey:false//不添加版本号
})

const Info = mongoose.model("Info",InfoSchema,"Info")
module.exports = Info