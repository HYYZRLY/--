// 用户相关处理
const mongoose = require('./db')

const NoticeSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true  //标题是唯一的
    },
    content:{
        type:String,
        default:""
    },
    add_time:{
        type:Date,
        default:Date.now()
    }
},{
    versionKey:false//不添加版本号
})

const Notice = mongoose.model("Notice",NoticeSchema,"Notice")
module.exports = Notice