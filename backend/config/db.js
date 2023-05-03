const mongoose = require("mongoose");
const { createClient } = require('redis');
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGO);
const client = createClient({
    url: process.env.REDIS
});

module.exports = {
    connection,
    client
}