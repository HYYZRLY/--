// 用户相关处理
const mongoose = require('./db')
const { Schema } = require('mongoose')

const PaySchema = new mongoose.Schema({
    rid:Schema.Types.ObjectId, //映射到预约表id
    name:String,
    iDoctor:String,
    iDepartment:String,
    register_time:{
        type:Date,
        default:Date.now()
    },
    medicalStatus:Number, //就诊状态
    week:String,
    time:String,
    uid:Schema.Types.ObjectId, //映射到用户表id
    registrationStatus:{ //预约状态：1表示已预约，0表示取消预约
        type:Number,
        default:1
    },
    add_time:{
        type:Date,
        default:Date.now()
    }
},{
    versionKey:false//不添加版本号
})

const Pay = mongoose.model("Pay",PaySchema,"Pay")
module.exports = Pay