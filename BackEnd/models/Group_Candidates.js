const db = require("../database");

const Group_Candidates = db.define(
  "group_candidates",
  {
    campaign_id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      foreignKey: [Object]
    },
    candidate_id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      foreignKey: [Object]
    },
    interview_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object]
    }
  },
  { underscored: true }
);
module.exports = Group_Candidates;
