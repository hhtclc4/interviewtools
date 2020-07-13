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

  city: {
    type: "VARCHAR(200)",
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
module.exports = Employment;
