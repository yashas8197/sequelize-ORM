const { DataTypes, sequelize } = require("../lib/");
const { user } = require("./user.model");
const { books } = require("./book.model");

const like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: books,
      key: "id",
    },
  },
});

user.belongsToMany(books, { through: like });
books.belongsToMany(user, { through: like });

module.exports = { like };
