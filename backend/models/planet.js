const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Planet = sequelize.define('Planet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  system: {
    type: DataTypes.STRING,
    allowNull: false
  },
  climate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  surfaceType: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'planets',
  timestamps: false
});

module.exports = Planet;
