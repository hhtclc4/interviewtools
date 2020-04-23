const db = require("../database");

const Company = db.define(
  "company",
  {
    id: {
      type: "INT",
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: "VARCHAR(100)",
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
    address: {
      type: "VARCHAR(200)",
      allowNull: true,
      defaultValue: "Đại học Sư phạm Kĩ thuật TP.HCM, số 1 Võ Văn Ngân",
      primaryKey: false,
    },
  },
  { underscored: true }
);
module.exports = Company;
