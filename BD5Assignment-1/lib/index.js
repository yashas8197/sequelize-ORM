const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5Assignment-1/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
