const { DataTypes, sequelize } = require("../lib/");

let restaurants = sequelize.define("restaurants", {
  name: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
  location: DataTypes.TEXT,
  rating: DataTypes.INTEGER,
  price_range: DataTypes.TEXT,
  opening_hours: DataTypes.TEXT,
});

module.exports = { restaurants };
