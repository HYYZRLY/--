// 用户相关处理
const mongoose = require('./db')

const SuggestionSchema = new mongoose.Schema({
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

const Suggestion = mongoose.model("Suggestion",SuggestionSchema,"Suggestion")
module.exports = Suggestion