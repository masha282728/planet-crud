const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Planet = sequelize.define('Planet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  system: {
    type: DataTypes.STRING,
    allowNull: false
  },
  climate: {
    type: DataTypes.STRING
  },
  population: {
    type: DataTypes.INTEGER
  },
  diameter: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  orbital_period: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

module.exports = Planet;

