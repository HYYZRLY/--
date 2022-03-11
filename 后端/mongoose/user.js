// 用户相关处理
const mongoose = require('./db')

const UserSchema = new mongoose.Schema({
    _openid:{
        type:String,
        unique:true  //微信openid是唯一的
    },
    username:{
        type:String,
    },
    avatarUrl:String,
    add_time:{
        type:Date,
        default:Date.now()
    }
},{
    versionKey:false//不添加版本号
})

const User = mongoose.model("User",UserSchema,"user")
module.exports = User