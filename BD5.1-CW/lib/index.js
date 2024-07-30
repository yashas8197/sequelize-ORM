let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5.1-CW/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
