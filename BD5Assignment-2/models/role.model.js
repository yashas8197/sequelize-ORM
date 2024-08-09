const { DataTypes, sequelize } = require("../lib/");

const roles = sequelize.define("roles", {
  roleId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { roles };
