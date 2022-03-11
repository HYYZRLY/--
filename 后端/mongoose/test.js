const Admin = require('./admin')

const admin = new Admin({
    username:"admin",
    password:"123"
})
admin.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("success");
    }
})