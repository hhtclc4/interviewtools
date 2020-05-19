const db = require("../database");

const Campaign = db.define(
  "campaign",
  {
    id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: "VARCHAR(200)",
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
    },
    image: {
      type: "LONGTEXT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },

    level_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object],
    },
    salary: {
      type: "double",
      allowNull: true,
      defaultValue: 0,
      primaryKey: false,
    },
    work_type_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object],
    },
    user_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object],
    },
    work_description: {
      type: "LONGTEXT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    status: {
      type: "INT",
      allowNull: true,
      defaultValue: 1,
    },
  },
  { underscored: true }
);
module.exports = Campaign;
