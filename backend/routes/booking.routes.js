const express = require("express");
const { UserModel } = require("../models/user.model");
const BookingRouter = express.Router();
const { BookingModel } = require("../models/booking.model")
const {NotificationModel} = require("../models/notification.model")
const {authMiddleWare} = require("../middlewares/jwt.middleware")
const {checkRole} = require("../routes/user.routes")
BookingRouter.get("/", async (req, res) => {
  try {
    let data = await BookingModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});
BookingRouter.post('/book', authMiddleWare, async (req, res) => {
  const { photographerId, startTime, endTime } = req.body;
  // Check if photographerId and userId are different
  if (photographerId === req.user.id) {
    return res.status(400).json({ message: 'You cannot book yourself.' });
  }

  // Check if booking is at least 4 hours
  const diffTime = Math.abs(new Date(endTime) - new Date(startTime));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  if (diffHours < 4) {
    return res
      .status(400)
      .json({ message: 'Booking should be at least 4 hours.' });
  }

  try {
    // Check if there is already a booking for the photographer during the requested time
    const existingBooking = await BookingModel.findOne({
      photographer: photographerId,
      start_time: { $lt: endTime },
      end_time: { $gt: startTime },
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ message: 'This photographer is not available during this time.' });
    }

    // Create new booking
    const booking = new BookingModel({
      photographer: photographerId,
      client: req.user.id,
      start_time: startTime,
      end_time: endTime,
    });

    await booking.save();

    return res.json({ message: 'Booking created successfully.' });
  } catch (error) {
    res.status(500).json({ message:error.message});
  }
});
// Retrieve all booking requests for a specific photographer
BookingRouter.get('/requests', authMiddleWare, async (req, res) => {
  try {
    // Get the logged-in photographer's ID
    const photographerId = req.user.id;
    // Find all booking requests for the logged-in photographer from the database
    const bookings = await BookingModel.find({photographer: photographerId}).populate('client','email');
    res.json({ok:true,bookings});
  } catch (err) {
    res.status(500).send({error:err.message,mssg:'Server Error'});
  }
});
// Route to accept or reject a booking request
BookingRouter.post('/requests/:bookingid', authMiddleWare, async (req, res) => {
  try {
    const { bookingid } = req.params;
    const { status, Notification } = req.body;
    // Check if the photographer is authorized to accept or reject the booking request
    const booking = await BookingModel.findOne({ _id: bookingid });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (!booking.photographer.equals(req.user._id)) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    // Update the booking status
    booking.status = status;
    await booking.save();
    // Send a notification to the user
    const notification = new NotificationModel({
      to: booking.client,
      from: req.user._id,
      booking: booking._id,
      message: Notification,
    });
    await notification.save();
    res.json({ok:true,mssg:"Booking updated and notification sent succcessfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
BookingRouter.post('/:bookingId/notifications', authMiddleWare, async (req, res) => {
  try {
    const { message } = req.body;
    const { bookingId } = req.params;
    const { id: from } = req.user;

    // Find the booking and make sure the logged in user is the associated photographer
    const booking = await BookingModel.findOne({ _id: bookingId, photographer: from });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create the notification and save it to the database
    const notification = new NotificationModel({ from, to: booking.client, booking: booking._id, message });
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /notifications
BookingRouter.get('/notifications', authMiddleWare, async (req, res) => {
  try {
    // Find all notifications sent to the user
    const notifications = await NotificationModel.find({ to: req.user.id }).populate('from').populate('booking');
    const messages = notifications.map(notification=> notification.message)
    res.json({ok:true,messages});
  } catch (error) {
    console.error(error);
    res.status(500).json({  });
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