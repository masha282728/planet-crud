const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

const Planet = sequelize.define("Planet", {
  name: { type: DataTypes.STRING, allowNull: false },
  system: { type: DataTypes.STRING, allowNull: false },
  climate: { type: DataTypes.STRING, allowNull: false },
  population: { type: DataTypes.INTEGER, allowNull: false },
  surfaceType: { type: DataTypes.STRING, allowNull: false }
});

sequelize.sync();

module.exports = { Planet, sequelize };
