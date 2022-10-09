const User = require("./User.model");
const Room = require("./Room.model");
const Message = require("./Message.model");

Room.belongsTo(User);
Message.belongsTo(Room);
Message.belongsTo(User);

export {
  User,
  Room,
  Message,
};