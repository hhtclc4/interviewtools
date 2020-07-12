const db = require("../database");
const Sequelize = require("sequelize");

const Invite = db.define(
  "invite",
  {
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
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
    timestamps: true,
  }
);
module.exports = Invite;
