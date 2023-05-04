const express = require("express");
const cors = require("cors");
const { connection, client } = require("./config/db");
const { logger } = require("./middlewares/logger.middleware");
const { userRoute } = require("./routes/user.routes");
const { authRoute } = require("./routes/auth.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get( "/", (req,res)=>{
    try {
        res.send({"ok":true,"msg":"Welcome to Backend of Book My Shoot"});
    } catch (error) {
        res.send({"ok":false, "msg":error.message})
    }
})

app.use("/user", userRoute);
app.use("/auth", authRoute);


app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log("MongoDB connected");
        await client.connect();
        console.log("Redis connected");
    } catch (error) {
        console.log(error.message);
        console.log("Database not Connected");
    }
    console.log(`Server running`);
})