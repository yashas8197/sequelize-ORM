const { DataTypes, sequelize } = require("../lib/");
const { books } = require("./book.model");
const { author } = require("./author.model");

const bookAuthor = sequelize.Sequelize("bookAuthor", {
  booksId: {
    type: DataTypes.INTEGER,
    references: {
      model: books,
      key: "id",
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: author,
      key: "id",
    },
  },
});

books.belongsToMany(author, { through: bookAuthor });
author.belongsToMany(author, { through: author });

module.exports = { bookAuthor };
