const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema(
  {
    photographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);
bookingSchema.index({ photographer: 1, date: 1, time: 1 }, { unique: true });

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports={
  BookingModel
}
