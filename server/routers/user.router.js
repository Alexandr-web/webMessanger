const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");

router.get("/api/:id", userController.getOne);
router.get("/api/:id/rooms", userController.getRooms);

module.exports = router;