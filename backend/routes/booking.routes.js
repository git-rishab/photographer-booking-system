const express = require("express");
const { UserModel } = require("../models/user.model");
const BookingRouter = express.Router();
const { BookingModel } = require("../models/booking.model")
const { NotificationModel } = require("../models/notification.model")
const { MeetingModel } = require("../models/meeting.model");
const { authMiddleWare } = require("../middlewares/jwt.middleware")
const { checkRole } = require("../routes/user.routes")
const moment = require("moment");
BookingRouter.get("/", async (req, res) => {
  try {
    let data = await BookingModel.find();
    res.send({ data, ok: true });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message, ok: false });
  }
});
BookingRouter.post('/book', authMiddleWare, checkRole("client"), async (req, res) => {
  try {
    const { photographerEmail, start, end } = req.body;
    const client = await UserModel.findById(req.user.id)
    const photographer = await UserModel.findOne({ email: photographerEmail, role: 'photographer', approved: true });
    if (!photographer) {
      return res.status(400).json({ msg: 'Photographer not found', ok: false });
    }
    const bookingStartTime = moment(start);
    const bookingEndTime = moment(end);
    if (!bookingStartTime.isValid() || !bookingEndTime.isValid()) {
      return res.status(400).json({ msg: 'Invalid booking time format', ok: false });
    }
    // const bookingDuration = moment.duration(bookingEndTime.diff(bookingStartTime)).asHours();
    // if (bookingDuration < 4) {
    //   return res.status(400).json({ msg: 'Minimum booking duration is 4 hours' });
    // }
    const existingBooking = await BookingModel.findOne({
      photographer: photographer._id,
      start: { $lt: bookingEndTime },
      end: { $gt: bookingStartTime }
    });
    if (existingBooking) {
      return res.status(400).json({ msg: 'Photographer is already booked for this time slot', ok: false });
    }
    const newBooking = new BookingModel({
      client,
      photographer: photographer._id,
      start_time: bookingStartTime.toDate(),
      end_time: bookingEndTime.toDate(),
    });
    await newBooking.save();
    res.json({ msg: 'Booking request sent successfully', ok: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: err.message, ok: false });
  }
});
// Retrieve all booking requests for a specific photographer
BookingRouter.get('/requests/:status', authMiddleWare, async (req, res) => {
  try {
    // Get the logged-in photographer's ID
    const photographerId = req.user.id;
    // Find all booking requests for the logged-in photographer from the database
    const bookings = await BookingModel.find({ photographer: photographerId, status: req.params.status }).populate('client', 'name email');
    res.json({ ok: true, bookings });
  } catch (err) {
    res.status(500).send({ error: err.message, mssg: 'Server Error', ok: false });
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
    res.json({ ok: true, msg: "Booking updated and notification sent succcessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: err.message });
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
    res.json({ ok: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: err.message });
  }
});

// GET /notifications
BookingRouter.get('/notifications', authMiddleWare, async (req, res) => {
  try {
    // Find all notifications sent to the user
    const notifications = await NotificationModel.find({ to: req.user.id }).populate('from').populate('booking');
    const messages = notifications.map(notification => notification.message)
    res.json({ ok: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error.message });
  }
});

BookingRouter.post('/meeting/create', async (req, res) => {
  try {
    const { msg, photographer, link,name } = req.body;
    const data = await MeetingModel.findOne({ photographer });
    const obj = {
      msg,
      link,
      name
    }
    console.log(data);
    if(!data){
      var newData = new MeetingModel({
        photographer,
        meetings:[]
      })
      newData.meetings.push(obj);
      await newData.save();
    } else {
      data.meetings.push(obj);
      await data.save();
    }
    res.json({ ok: true, msg: "Meeting created successfully" });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
})

BookingRouter.get('/:photographerId', async(req,res)=>{
  try {
    const data = await MeetingModel.findOne({photographer:req.params.photographerId})
    res.json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
})

module.exports = {
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