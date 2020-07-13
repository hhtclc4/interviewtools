const db = require("../database");
const Sequelize = require("sequelize");

const Group_Candidates = db.define(
  "group_candidates",
  {
    campaign_id: {
      type: "INT",
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: "INT",
      allowNull: false,
      primaryKey: true,
    },
    interview_id: {
      type: "INT",
      allowNull: true,
      primaryKey: false,
    },
    cv: {
      type: "Longtext",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    description: {
      type: "Longtext",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    interview_time: {
      type: "TIME",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },

    answer_records: Sequelize.VIRTUAL,
  },
  { underscored: true }
);
module.exports = Group_Candidates;
