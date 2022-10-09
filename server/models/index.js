const User = require("./User.model");
const Room = require("./Room.model");

Room.belongsTo(User);

export {
  User,
  Room,
};