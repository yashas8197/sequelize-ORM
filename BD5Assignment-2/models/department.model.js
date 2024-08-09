const { DataTypes, sequelize } = require("../lib/");

const department = sequelize.define("department", {
  departmentId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { department };
