const User = require('../models/User');
const bcrypt = require('bcrypt');
async function createUser(data) {
  try {
    const { password, ...userData } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...userData, passwordHash: hashedPassword });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  createUser,
};
