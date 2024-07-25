const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const RequestLog = sequelize.define('RequestLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  memoryUsage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responseCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = RequestLog;
