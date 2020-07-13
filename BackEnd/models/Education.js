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
  date_begin: {
    type: "date",
    allowNull: false,
    defaultValue: "2016-06-14",
    primaryKey: false,
  },
  date_end: {
    type: "date",
    allowNull: false,
    defaultValue: "2020-06-14",
    primaryKey: false,
  },
  description: {
    type: "Longtext",
  },
});
module.exports = Education;
