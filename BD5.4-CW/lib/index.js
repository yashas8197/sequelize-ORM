const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5.4-CW/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
