// 用户相关处理
const mongoose = require('./db')
const { Schema } = require('mongoose')

const RosterSchema = new mongoose.Schema({
    total:Number,  //总挂号数
    registrationNum:Number, //已挂号数
    doId:Schema.Types.ObjectId, //映射到医生表id
    week:Number,
    time:Number
},{
    versionKey:false//不添加版本号
})

const Roster = mongoose.model("Roster",RosterSchema,"Roster")
module.exports = Roster