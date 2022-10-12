const sequelize = require("../db");
const { DataTypes, } = require("sequelize");

module.exports = sequelize.define("room", {
  members: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    required: true,
    unique: true,
  },
  desc: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
}, { tableName: "room", });