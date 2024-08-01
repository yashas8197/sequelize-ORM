const { DataTypes, sequelize } = require("../lib/");

const employees = sequelize.define("employees", {
  name: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  department: DataTypes.TEXT,
  designation: DataTypes.TEXT,
});

module.exports = { employees };
