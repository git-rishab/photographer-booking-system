const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  let NotificationModel = mongoose.model("notification",NotificationSchema)
  module.exports={NotificationModel}