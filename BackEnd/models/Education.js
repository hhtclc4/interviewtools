const db = require("../database");

const Education = db.define("education", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
  },
  university: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false,
  },
  degree: {
    type: "int",
    allowNull: false,
    primaryKey: false,
  },
  completion_time: {
    type: "int",
    allowNull: false,
    primaryKey: false,
  },
});
module.exports = Education;
