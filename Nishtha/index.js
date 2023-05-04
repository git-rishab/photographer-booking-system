const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
var cors = require('cors')
app.use(cors())
// set up middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// connect to MongoDB
const db=mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define schema for image
const imageSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
    userID:String
  },
});

// define model for image
const Image = mongoose.model('Image', imageSchema);

// set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// set up routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('image'), async (req, res) => {
  req.body.userID=2;
  const image = new Image({
    // name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      userID:req.body.userID // adding userid in the image
    },
  });

  await image.save();

  res.redirect('/images');
});

app.get('/images', async (req, res) => {
  const images = await Image.aggregate([
      {
        $group: {
          _id: '$image.userID',
          images: {
            $push: {
              _id: '$image.data',
              content_type:'$image.contentType'
            },
          },
        },
      },
    ]);
    res.send(images);

  
});

// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


