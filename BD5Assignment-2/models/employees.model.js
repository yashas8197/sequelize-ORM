const { DataTypes, sequelize } = require("../lib/");

const employees = sequelize.define("employees", {
  employeeId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { employees };
