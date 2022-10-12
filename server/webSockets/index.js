const io = require("./socket.io");
const User = require("../models/User.model");
const Room = require("../models/Room.model");
const Message = require("../models/Message.model");

io.on("connection", (socket) => {
  socket.on("setRoom", async (data) => {
    try {
      if (!Object.keys(data).every((key) => ["userId", "roomTitle"].includes(key))) {
        throw new Error("Некорректные данные");
      }

      const user = await User.findOne({ where: { id: data.userId, }, });
      const room = await Room.findOne({ where: { title: data.roomTitle, }, });

      if (!user) {
        throw new Error("Такого пользователя не существует");
      }

      if (!room) {
        throw new Error("Такой комнаты не существует");
      }
      
      const messages = await Message.findAll({ where: { roomId: room.id, }, });
      const roomData = {
        user: {
          isAuthor: room.userId === data.userId,
          isMember: room.members.includes(data.userId),
        },
        title: room.title,
        desc: room.desc,
        members: room.members,
        messages,
      };

      io.emit("doneCreatingRoom", roomData);
    } catch (err) {
      console.log(err);

      throw new Error("Произошла ошибка сервера");
    }
  });

  socket.on("joinToRoom", async (data) => {
    try {
      if (!Object.keys(data).every((key) => ["userId", "titleRoom"].includes(key))) {
        throw new Error("Некорректные данные");
      }

      const { userId, titleRoom, } = data;
      const user = await User.findOne({ where: { id: userId, }, });
      const room = await Room.findOne({ where: { title: titleRoom, }, });

      if (!user) {
        throw new Error("Такого пользователя не существует");
      }

      if (!room) {
        throw new Error("Такой комнаты не существует");
      }

      if (room.members.includes(userId)) {
        throw new Error("Такой пользователь уже является участником данной комнаты");
      }

      const updateRoom = await room.update({ members: room.members.concat(userId), });
      const roomData = {
        user: {
          isAuthor: updateRoom.userId === data.userId,
          isMember: updateRoom.members.includes(data.userId),
        },
        members: updateRoom.members,
      };

      io.emit("doneJoiningToRoom", roomData);
    } catch (err) {
      console.log(err);

      throw err;
    }
  });
});