const db = require("../database");

const Skills = db.define("skills", {
  user_id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
  },
  subject_id: {
    type: "int",
    allowNull: false,
    primaryKey: true,
  },
  level: {
    type: "int",
    allowNull: false,
    primaryKey: false,
  },
});
module.exports = Skills;
