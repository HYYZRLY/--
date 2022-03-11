const mongoose = require('./db')

const DepartmentSchema = mongoose.Schema({
    department:{ //科室名
        type:String,
        unique:true
    },
    // 科室介绍
    introduction:String,
    // 科室地址
    department_addr:String
},{
    versionKey:false//不添加版本后
})

const Department = mongoose.model("Department",DepartmentSchema,"Department")
module.exports = Department