const User = require('../models/User');
const Review = require('../models/review');
// Define associations
User.hasMany(Review, {
  foreignKey: 'userId',
  as: 'reviews', 
});
Review.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user', 
});
