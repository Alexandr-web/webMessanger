const { Server, } = require("socket.io");
const socketHost = require("./host");
const host = require("../host");
const io = new Server(parseInt(socketHost.match(/\d{4}/)[0]), { cors: { origin: host, }, });

module.exports = io;