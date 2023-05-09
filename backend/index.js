const express = require("express");
const { connection, client } = require("./config/db");
const { logger } = require("./middlewares/logger.middleware");
const { userRoute } = require("./routes/user.routes");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { BookingRouter } = require("./routes/booking.routes")
const { authRoute } = require("./routes/auth.routes");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  try {
    res.send({ "ok": true, "msg": "Welcome to Backend of Book My Shoot" });
  } catch (error) {
    res.send({ "ok": false, "msg": error.message })
  }
})
app.use("/user", userRoute);
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API Project for BookMyShoot',
      version: '1.0.0',
      description:
        "About : - This is a Photographer Booking application in which you can hire Top quality Photographers or become a Photographer and this is documentation of application BookMyShoot.",
      license: {
        name: "BookMyShoot"
      },
      contact: {
        name: "BookMyShoot",
        url: "bookmyshoot.com",
        email: "kanj@gmail.com",
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/'
      }
    ]
  },
  apis: ['./routes/*.js']
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/auth", authRoute);
app.use("/book", BookingRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDb Database");
    await client.connect();
    console.log("Connected to Redis Database");
  } catch (error) {
    console.log(error.message);
    console.log("Database not Connected");
  }
  console.log(`Server is running at port ${process.env.PORT}`);
})