let { DataTypes, sequelize } = require("../lib/");

let books = sequelize.define("books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  books,
};
