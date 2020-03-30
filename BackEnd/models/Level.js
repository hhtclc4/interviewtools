const db = require("../database");

const Level = db.define("level", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
    foreignKey: [Object]
  },
  name: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false
  }
});
module.exports = Level;
