const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BDAssignment-1/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
