const Sequelize = require("sequelize");
const db = require("../database");

const Subject = db.define("subject", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
    foreignKey: [Object]
  },
  title: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false
  }
});
module.exports = Subject;
