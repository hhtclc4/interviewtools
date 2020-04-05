const db = require("../database");

const Campaign_Subject = db.define(
  "campaign_subject",
  {
    campaign_id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      foreignKey: [Object]
    },
    subject_id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      foreignKey: [Object]
    }
  },
  { underscored: true }
);
module.exports = Campaign_Subject;
