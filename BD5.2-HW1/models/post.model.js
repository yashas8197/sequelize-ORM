let { DataTypes, sequelize } = require("../lib/");

const posts = sequelize.define("posts", {
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  content: DataTypes.TEXT,
  title: DataTypes.TEXT,
});

module.exports = { posts };
