const sequelize = require("../db");
const { DataTypes, } = require("sequelize");

module.exports = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isMy: { type: DataTypes.BOOLEAN, },
  authorName: { type: DataTypes.TEXT, },
  desc: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
}, { tableName: "message", });