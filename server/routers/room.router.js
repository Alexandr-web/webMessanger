const express = require("express");
const router = express.Router();
const roomController = require("../controllers/Room.controller");
const isAuth = require("../middleware/isAuth");

router.post("/create", isAuth, roomController.create);

module.exports = router;