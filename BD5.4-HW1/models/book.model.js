const { DataTypes, sequelize } = require("../lib/");

const books = sequelize.define("books", {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { books };
