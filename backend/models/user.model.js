const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    pass: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        default:"client",
        enum:["photographer","admin","client"]
    }
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}