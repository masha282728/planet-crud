const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './planets.db' });
const Planet = sequelize.define('Planet', {
  name: { type: DataTypes.STRING, allowNull: false },
  system: { type: DataTypes.STRING, allowNull: false },
  climate: { type: DataTypes.STRING, allowNull: false },
  population: { type: DataTypes.INTEGER, allowNull: false }
});
sequelize.sync();
module.exports = Planet;
