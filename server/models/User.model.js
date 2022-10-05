const sequelize = require("../db");
const { DataTypes, } = require("sequelize");

module.exports = sequelize.define("user", {
  name: { type: DataTypes.TEXT, },
  email: {
    type: DataTypes.TEXT,
    unique: true,
  },
  password: { type: DataTypes.TEXT, },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, { tableName: "user", });