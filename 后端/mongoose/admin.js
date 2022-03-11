// 用户相关处理
const mongoose = require('./db')

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true  //用户名是唯一的
    },
    password:{
        type:String,
        // 密码加密
        set(val){
            // 参数1：要散列的值；参数2：指数，
            return require('bcrypt').hashSync(val,10)
        }

    },
    add_time:{
        type:Date,
        default:Date.now()
    }
},{
    versionKey:false//不添加版本号
})

const Admin = mongoose.model("Admin",AdminSchema,"admin")
module.exports = Admin