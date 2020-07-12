const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
  id: {
    type: "INT(11)",
    allowNull: false,
    defaultValue: null,
    autoIncrement: true,
    primaryKey: true,
    foreignKey: [Object],
  },
  name: {
    type: "VARCHAR(50)",
    allowNull: false,
    primaryKey: false,
  },
  email: {
    type: "VARCHAR(50)",
    allowNull: true,
    primaryKey: false,
  },
  password: {
    type: "VARCHAR(50)",
    allowNull: true,
    primaryKey: false,
  },
  avatar: {
    type: "LONGTEXT",
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
  },
  role_id: {
    type: "int(11)",
    allowNull: true,
    defaultValue: 1,
    primaryKey: false,
  },
  phone: {
    type: "VARCHAR(45)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
  },
  company_id: {
    type: "int(11)",
  },
  education_id: {
    type: "int(11)",
    allowNull: true,
    primaryKey: false,
  },
  type: {
    type: "int(11)",
    allowNull: true,
    defaultValue: 0, //0 is apply to Campain, 1 is apply to web
    primaryKey: false,
  },
  job_title: {
    type: "VARCHAR(45)",
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
  },
  description: {
    type: "VARCHAR(200)",
  },
  skills: Sequelize.VIRTUAL,
});
module.exports = User;
