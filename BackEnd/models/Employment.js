const db = require("../database");

const Employment = db.define("employment", {
  user_id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
  },
  position: {
    type: "INT",
    allowNull: false,
    primaryKey: true,
  },
  company: {
    type: "VARCHAR(200)",
    allowNull: false,
    primaryKey: false,
  },
  exp: {
    type: "INT",
    allowNull: false,
    primaryKey: false,
  },
  city: {
    type: "VARCHAR(200)",
    allowNull: false,
    primaryKey: false,
  },
});
module.exports = Employment;
