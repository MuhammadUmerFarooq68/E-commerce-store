const User = require('../models/User');
const bcrypt = require('bcrypt');
async function createUser(data) {
  try {
    const { password, email, ...userData } = data;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...userData,email, passwordHash: hashedPassword });
    return user;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw new Error(error.message);
  }
}
module.exports = {
  createUser,
};
