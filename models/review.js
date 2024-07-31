// models/Review.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Review = sequelize.define('Review', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {});


module.exports = Review;
