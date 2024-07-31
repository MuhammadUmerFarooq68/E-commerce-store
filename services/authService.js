const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { encryptToken, decryptToken } = require('../Utils/encryption'); 
const User = require('../models/User');
const sodium = require('sodium-native');
const SECRET_KEY = 'jack'; 
const CHACHA_KEY = Buffer.alloc(sodium.crypto_stream_chacha20_KEYBYTES);
sodium.randombytes_buf(CHACHA_KEY);
async function authenticate(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  const encryptedToken = await encryptToken(token, CHACHA_KEY);
   return encryptedToken;
}
async function decryptAuthenticatedToken(encryptedToken) {
  const decryptedToken = await decryptToken(encryptedToken.nonce, encryptedToken.ciphertext, CHACHA_KEY);
  return decryptedToken;
}
module.exports = {
  authenticate,
  decryptAuthenticatedToken,
};
