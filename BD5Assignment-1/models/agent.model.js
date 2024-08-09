const { DataTypes, sequelize } = require("../lib/");

const agent = sequelize.define("agent", {
  agentId: {
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
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { agent };
