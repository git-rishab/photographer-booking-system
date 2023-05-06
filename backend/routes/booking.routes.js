const express = require("express");
const { UserModel } = require("../models/user.model");
const BookingRouter = express.Router();
const { BookingModel } = require("../models/booking.model")
const {NotificationModel} = require("../models/notification.model")
const {authMiddleWare} = require("../middlewares/jwt.middleware")
const moment = require("moment")
BookingRouter.post('/book',authMiddleWare,async (req, res) => {
  try {
    const { photographerEmail, start, end } = req.body;
    const client = await  UserModel.findById(req.user.id)
    const photographer = await UserModel.findOne({ email: photographerEmail,role:'photographer',approved:true });
    if (!photographer) {
      return res.status(400).json({ msg: 'Photographer not found' });
    }
    const bookingStartTime = moment(start);
    const bookingEndTime = moment(end);
    if (!bookingStartTime.isValid() || !bookingEndTime.isValid()) {
      return res.status(400).json({ msg: 'Invalid booking time format' });
    }

    if (bookingStartTime >= bookingEndTime) {
      return res.status(400).json({ msg: 'End time should be after start time' });
    }

    const bookingDuration = moment.duration(bookingEndTime.diff(bookingStartTime)).asHours();
    if (bookingDuration < 4) {
      return res.status(400).json({ msg: 'Minimum booking duration is 4 hours' });
    }

    const existingBooking = await BookingModel.findOne({
      photographer: photographer._id,
      start: { $lt: bookingEndTime },
      end: { $gt: bookingStartTime }
    });
    if (existingBooking) {
      return res.status(400).json({ msg: 'Photographer is already booked for this time slot' });
    }
    const newBooking = new BookingModel({
      client,
      photographer: photographer._id,
      start_time: bookingStartTime.toDate(),
      end_time: bookingEndTime.toDate(),
    });
    await newBooking.save();
    res.json({ msg: 'Booking request sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Retrieve all booking requests for a specific photographer
BookingRouter.get('/requests', authMiddleWare, async (req, res) => {
  try {
    // Get the logged-in photographer's ID
    const photographerId = req.user.id;

    // Find all booking requests for the logged-in photographer from the database
    const bookings = await BookingModel.find({ photographer: photographerId, status: 'Pending' }).populate('client', 'name','email');

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// POST route for photographer to accept/reject booking request
BookingRouter.post('/requests/:bookingId', authMiddleWare, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Check if user is a photographer
    if (req.user.role !== 'photographer') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find the booking request
    const booking = await BookingModel.findById(bookingId);

    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking request not found' });
    }

    // Check if the booking request is for the current photographer
    if (booking.photographer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Check if the booking request is still pending
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Booking request has already been processed' });
    }
    // Update the booking status
    booking.status = status;
    await booking.save();
    // Send response
    res.status(200).json({ message: 'Booking request updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// BookingRouter.post('/notifications', authMiddleWare, async (req, res) => {
//   try {
//     const { to, bookingId, message } = req.body;

//     // Check if the user is a photographer and is associated with the given booking
//     const booking = await BookingModel.findOne({ _id: bookingId, photographer: req.user.id });
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     // Create a new notification
//     const notification = new NotificationModel({
//       from: req.user.id,
//       to,
//       booking: bookingId,
//       message,
//     });

//     // Save the notification to the database
//     await notification.save();

//     res.json({ message: 'Notification sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// GET /notifications
BookingRouter.get('/notifications', authMiddleWare, async (req, res) => {
  try {
    // Find all notifications sent to the user
    const notifications = await NotificationModel.find({ to: req.user.id }).populate('from').populate('booking');
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  module.exports={
    BookingRouter
  }
  // {
  //   "_id": {
  //     "$oid": "645509efa817b6d6e53c4c24"
  //   },
  //   "photographer": {
  //     "$oid": "64527477abde073483bf24d1"
  //   },
  //   "client": {
  //     "$oid": "64527477abde073483bf24d1"
  //   },
  //   "start_time": {
  //     "$date": "2023-06-01T10:00:00.000Z"
  //   },
  //   "end_time": {
  //     "$date": "2023-06-01T14:00:00.000Z"
  //   },
  //   "status": "pending",
  //   "createdAt": {
  //     "$date": "2023-05-05T13:51:44.006Z"
  //   },
  //   "updatedAt": {
  //     "$date": "2023-05-05T13:51:44.006Z"
  //   },
  //   "__v": 0
  // }