const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    role: { type: String, enum: ['client', 'photographer','admin'], default: 'client' },
    meetings: { type:Array,required:true, default: [] },
    approved: { type: Boolean, default: false },
    camera: {
      type: String,
      default: null
    },
    expertise: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    price:{
      type:Number,
      default:null
    }
  });

const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}
// const imageSchema = new mongoose.Schema({
//   name: String,
//   image: {
//     data: Buffer,
//     contentType: String,
//     userID:String
//   },
// });