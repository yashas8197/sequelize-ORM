const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5.1-HW2/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
