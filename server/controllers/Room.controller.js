const RoomModel = require("../models/Room.model");
const Message = require("../models/Message.model");

class Room {
  async create(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения текущей операции необходимо авторизоваться", status: 403, });
      }

      if (!Object.keys(req.body).includes("title")) {
        return res.status(400).json({ ok: false, message: "Некорректные данные", status: 400, });
      }

      const findRoomByTitle = await RoomModel.findOne({ where: { title: req.body.title, }, });

      if (findRoomByTitle) {
        return res.status(400).json({ ok: false, message: "Такая комната уже существует", status: 400, });
      }

      const roomData = { ...req.body, userId: req.userId, members: [req.userId], };
      
      await RoomModel.create(roomData);

      return res.status(200).json({ ok: true, message: "Комната создана", status: 200, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }

  async getMessages(req, res) {
    try {
      const { id, } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ ok: false, message: "Некорректные данные", status: 400, });
      }

      const messages = await Message.findAll({ where: { roomId: id, }, });

      return res.status(200).json({ ok: true, messages, status: 200, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }

  async getByTitle(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения текущей операции необходимо авторизоваться", status: 403, });
      }

      const { title, } = req.query;

      if (!title) {
        return res.status(400).json({ ok: false, message: "Некорректные данные", status: 400, });
      }

      const rooms = await RoomModel.findAll();
      const filterByTitleRooms = rooms.filter(({ title: titleRoom, }) => titleRoom.toLowerCase().includes(title.toLowerCase()));

      return res.status(200).json({ ok: true, rooms: filterByTitleRooms, status: 200, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }
}

module.exports = new Room();