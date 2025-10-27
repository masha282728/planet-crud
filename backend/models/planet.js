const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Planet = sequelize.define('Planet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  system: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  climate: {
    type: DataTypes.STRING,
  },
  population: {
    type: DataTypes.INTEGER,
  },
  diameter: {
    type: DataTypes.FLOAT,
  },
  orbital_period: {
    type: DataTypes.FLOAT,
  },
});

module.exports = { Planet, sequelize };
