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
    company_address: {
      type: "VARCHAR(200)",
      allowNull: true,
      defaultValue: "Đại học Sư phạm Kĩ thuật TP.HCM, số 1 Võ Văn Ngân",
      primaryKey: false,
    },
    level_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object],
    },
    amount_required: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    work_type_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object],
    },

    experience: {
      type: "INT",
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
    },
    salary: {
      type: "DOUBLE",
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
    },
    deadline: {
      type: "DATE",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    user_id: {
      type: "INT",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      foreignKey: [Object],
    },
    work_description: {
      type: "VARCHAR(200)",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    candidate_req: {
      type: "VARCHAR(200)",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
    candidate_benefits: {
      type: "VARCHAR(200)",
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
    },
  },
  { underscored: true }
);
module.exports = Campaign;
