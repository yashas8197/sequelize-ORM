const { DataTypes, sequelize } = require("../lib/");

const tickets = sequelize.define("tickets", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "closed"),
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { tickets };
