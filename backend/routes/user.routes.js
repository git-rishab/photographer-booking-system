const express = require("express");
const { UserModel } = require("../models/user.model");
const { Image } = require("../models/image.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenList = {};
const session = require("express-session")
const { authMiddleWare } = require("../middlewares/jwt.middleware");
require("dotenv").config()
const userRoute = express.Router();
//Set up multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  }
}




//Route for uploading the images
userRoute.post('/upload', upload.single('image'), authMiddleWare, async (req, res) => {
  const image = new Image({
    name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      userID: req.user._id // adding userid in the image
    },
  });

  await image.save();
  res.send({ message: "image uploaded" });
});

//Route for updating the details
userRoute.patch('/submit_photographer_details', authMiddleWare, async (req, res) => {
  const payload = req.body
  try {
    await UserModel.findByIdAndUpdate({ "_id": req.user._id }, payload)
    res.send({ message: "success" });
  } catch (err) {
    console.log(err);
  }
})

//Route for getting the images by userID

userRoute.get('/images', async (req, res) => {
  const photographers = await UserModel.find({ approved: true })
  const images = await Image.aggregate([
    {
      $group: {
        _id: '$image.userID',
        images: {
          $push: {
            _id: '$image.data',
            content_type: '$image.contentType'
          },
        },
      },
    },
  ]);
  res.send({ images, photographers });
});

// Route for getting the Photographers sorted by price and filtered by location
userRoute.get('/SortByPrice', async (req, res) => {
  let query = {}
  let sortby = { price: 0 }
  query.approved = true;
  if (req.query.location) {
    query.address = req.query.location
  }
  if (req.query.Sortby) {
    if (req.query.Sortby == "asc") {
      sortby["price"] = 1;
    } else {
      sortby["price"] = -1;
    }
  }
  const photographers = await UserModel.find(query).sort(sortby)
  const images = await Image.aggregate([
    {
      $group: {
        _id: '$image.userID',
        images: {
          $push: {
            _id: '$image.data',
            content_type: '$image.contentType'
          },
        },
      },
    },
  ]);

  res.send({ images, photographers });
});

// route for getting photos of individual photographers

userRoute.get("/images/:id", async (req, res) => {
  const photographers = await UserModel.find({ _id: req.params.id, approved: true })
  const images = await Image.aggregate([
    {
      $group: {
        _id: '$image.userID',
        images: {
          $push: {
            _id: '$image.data',
            content_type: '$image.contentType'
          },
        },
      },
    },
  ]);

  const Images = images.filter(function (image) {
    return image._id === req.params.id;
  });
  
  res.send({ Images, photographers });

})


userRoute.get("/", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.send(data)

  } catch (error) {
    res.status(403).json({ error: error.message })
  }
})

userRoute.post("/register", async (req, res) => {
  const { name, email, pass, role } = req.body;
  const check = await UserModel.find({ email });
  if (check.length > 0) {
    return res.status(200).json({ "ok": false, "msg": "User already exist" });
  }
  bcrypt.hash(pass, 5, async (err, hash) => {
    try {
      const data = new UserModel({ name, email, pass: hash, role });
      await data.save();
      res.status(200).json({ "ok": true, "msg": "Registered Successfully" });

    } catch (error) {
      res.status(400).json({ "ok": false, "msg": error.message });
    }

  });
})

userRoute.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User with this email not found", ok: false })
    }
    const isPasswordSame = await bcrypt.compare(pass, user.pass)
    if (!isPasswordSame) {
      return res.status(401).json({ msg: "Invalid email or password", ok: false })
    }
    const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1hr' })
    const refreshToken = jwt.sign({ userId: user._id }, process.env.refresh_secret, { expiresIn: "3hr" })
    const response = {
      "ok": true,
      "token": token,
      "refreshToken": refreshToken,
      "msg": "Login Successfull",
      "role": user.role,
      "approved": user.approved,
      "id": user._id,
      "userName": user.name
    }
    tokenList[refreshToken] = response
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ "ok": false, "msg": error.message });
  }
})
userRoute.post('/apply', authMiddleWare, async (req, res) => {
  const { name, email, camera, expertise, address, samplePics } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found', ok: false });
    }
    user.name = name;
    user.email = email;
    user.camera = camera;
    user.expertise = expertise;
    user.address = address;
    user.samplePics = samplePics;
    user.approved = false;
    user.role = 'photographer';
    await user.save();
    res.json({ msg: 'Application submitted successfully', ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

userRoute.get('/pending', authMiddleWare, async (req, res) => {
  try {
    const users = await UserModel.find({ role: "photographer", approved: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRoute.put('/applications/:email', authMiddleWare, checkRole("admin"), async (req, res) => {
  try {
    const { email } = req.params;
    const { approved } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    } else if (user.role !== 'photographer') {
      res.status(400).send({ error: 'User is not a photographer' });
    } else {
      user.approved = approved;
      await user.save();
      res.send({ message: 'Photographer application updated successfully' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Server Error' });
  }
});

// userRoute.use(session({
//   secret: 'dancingCar',
//   resave: false,
//   saveUninitialized: false
// }));


userRoute.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: 'Logged out successfully' });
    }
  });
});

// Info of a particular user

userRoute.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.params.id });
    const { name, email, role, approved, camera, expertise, address, price, _id } = user;
    res.send({ ok: true, user: { name, email, role, approved, camera, expertise, address, price, _id } })
  } catch (error) {
    res.status(500).send({ msg: error.message, ok: false });
  }
})


module.exports = {
  userRoute, checkRole
}