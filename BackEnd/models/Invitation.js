const db = require("../database");
const Sequelize = require("sequelize");

const Invitation = db.define("invitation", {
  campaign_id: {
    type: "INT",
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  },
  user_id: {
    type: "INT",
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
  },
});
module.exports = Invitation;
