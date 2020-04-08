const db = require("../database");

const Interview = db.define(
  "interview",
  {
    id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      foreignKey: [Object],
      autoIncrement: true,
    },
    name: {
      type: "VARCHAR(200)",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    date: {
      type: "DATE",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    time: {
      type: "TIME",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    choose_from: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    choose_to: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    campaign_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
  },
  { underscored: true }
);
module.exports = Interview;
