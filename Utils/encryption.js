const { randombytes_buf, crypto_stream_chacha20_xor } = require('sodium-native');
async function encryptToken(token, key) {
  const nonce = Buffer.alloc(8); 
  randombytes_buf(nonce); 
  const ciphertext = Buffer.alloc(token.length); 
  crypto_stream_chacha20_xor(ciphertext, Buffer.from(token, 'utf8'), nonce, key);
  return {
    nonce: nonce.toString('hex'),
    ciphertext: ciphertext.toString('hex'),
  };
}
async function decryptToken(nonceHex, ciphertextHex, key) {
  const nonce = Buffer.from(nonceHex, 'hex');
  const ciphertext = Buffer.from(ciphertextHex, 'hex');

  const plaintext = Buffer.alloc(ciphertext.length); 
  crypto_stream_chacha20_xor(plaintext, ciphertext, nonce, key); 

  return plaintext.toString('utf8');
}
module.exports = {
  encryptToken,
  decryptToken,
};
