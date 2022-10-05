const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Auth {
  async registration(req, res) {
    try {
      const { name, email, password, } = req.body;

      if (![name, email, password].every(Boolean)) {
        return res.status(400).json({ ok: false, message: "Неккоректные данные", status: 400, });
      }

      const user = await User.findOne({ where: { email, }, });

      if (user) {
        return res.status(400).json({ ok: false, message: "Пользователь с таким email уже существует", status: 400, });
      }

      const hashPassword = await bcrypt.hash(password, 7);
      const userData = {
        ...req.body,
        password: hashPassword,
      };

      await User.create(userData);

      return res.status(200).json({ ok: true, message: "Пользователь зарегистрирован", status: 200, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }

  async login(req, res) {
    try {
      const { email, password, } = req.body;

      if (![email, password].every(Boolean)) {
        return res.status(400).json({ ok: false, message: "Неккоректные данные", status: 400, });
      }

      const user = await User.findOne({ where: { email, }, });
      
      if (!user) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", status: 404, });
      }

      const isTruePassword = await bcrypt.compare(password, user.password);

      if (!isTruePassword) {
        return res.status(400).json({ ok: false, message: "Неверный пароль", status: 400, });
      }

      const tokenData = Object.keys(user.dataValues).filter((key) => key !== "password").reduce((acc, key) => {
        acc[key] = user[key];

        return acc;
      }, {});
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), });

      return res.status(200).json({ ok: true, message: "Пользователь вошел", status: 200, token: `Bearer ${token}`, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", status: 500, });
    }
  }
}

module.exports = new Auth();