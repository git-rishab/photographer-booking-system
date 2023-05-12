const mongoose = require("mongoose");
const meetingSchema = mongoose.Schema({
    photographer:{
        type:String,
        required:true
    },
    meetings:{
        type:Array
    }
})

const MeetingModel = mongoose.model("meeting",meetingSchema);

module.exports = {
    MeetingModel
}