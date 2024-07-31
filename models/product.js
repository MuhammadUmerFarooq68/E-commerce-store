const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add other fields as necessary
}, {
  tableName: 'products',
  timestamps: false 
});

module.exports = Product;
