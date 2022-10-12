const UserModel = require("../models/User.model");
const Room = require("../models/Room.model");

class User {
  async getOne(req, res) {
    try {
      const { id, } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ ok: false, message: "Некорректные данные", status: 400, });
      }

      const user = await UserModel.findOne({ where: { id, }, });

      return res.status(200).json({ ok: true, user, status: 200, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }

  async getRooms(req, res) {
    try {
      const { id, } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ ok: false, message: "Некорректные данные", status: 400, });
      }

      const user = await UserModel.findOne({ where: { id, }, });

      if (!user) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", status: 404, });
      }

      const rooms = await Room.findAll();
      const roomsWhereUserIsMember = rooms.filter(({ members, }) => members.includes(parseInt(id)));

      return res.status(200).json({ ok: true, rooms: roomsWhereUserIsMember, status: 200, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }
}

module.exports = new User();