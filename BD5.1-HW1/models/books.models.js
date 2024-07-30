let { DataTypes, sequelize } = require("../lib/");

let books = sequelize.define("books", {
  title: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  publication_year: DataTypes.INTEGER,
  author: DataTypes.TEXT,
  publisher: DataTypes.TEXT,
  pages: DataTypes.INTEGER,
});

module.exports = {
  books,
};
