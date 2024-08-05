const { DataTypes, sequelize } = require("../lib/");

const author = sequelize.define("author", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { author };
