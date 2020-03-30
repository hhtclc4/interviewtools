const db = require("../database");

const Work_Type = db.define("work_type", {
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
module.exports = Work_Type;
