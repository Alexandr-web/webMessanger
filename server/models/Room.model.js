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
}, { tableName: "room", });