const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const host = require("./host");
const db = require("./db");

require("dotenv").config();
require("./models/index");
require("./webSockets/index");

// Server settings
app.use(cors({ origin: [host], }));
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());

// Database
const connectToDatabase = async () => {
  try {
    await db.authenticate();
    await db.sync();

    console.log("Connection has been established successfully");
  } catch (err) {
    console.log(err);

    throw err;
  }
};

connectToDatabase();

// Routers
const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const roomRouter = require("./routers/room.router");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);

module.exports = app;