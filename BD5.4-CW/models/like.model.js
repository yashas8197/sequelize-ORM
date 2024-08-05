const { DataTypes, sequelize } = require("../lib/");
const { user } = require("./user.model");
const { track } = require("./track.model");

const like = sequelize.define("like", {
  userId: {
    type: DataTypes.STRING,
    references: {
      model: user,
      key: "id",
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: track,
      key: "id",
    },
  },
});

user.belongsToMany(track, { through: like });
track.belongsToMany(user, { through: like });

module.exports = { like };
