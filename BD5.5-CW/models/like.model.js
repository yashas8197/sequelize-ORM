const { track } = require("./track.model");
const { user } = require("./user.model");
const { DataTypes, sequelize } = require("../lib/");

const like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
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

track.belongsToMany(user, { through: like });
user.belongsToMany(track, { through: like });

module.exports = { like };
