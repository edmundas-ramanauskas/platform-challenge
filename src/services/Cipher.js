const crypto = require('crypto');

const TEXT_ENCODING = 'utf8';
const CIPHER_ENCODING = 'hex';

const getKey = pass =>
  crypto.createHash('sha256')
    .update(pass)
    .digest('base64')
    .substr(0, 32);

class Cipher {
  constructor(iv, algo = 'aes-256-ctr') {
    this.iv = iv.slice(0, 16);
    this.algo = algo;
  }

  encrypt(pass, data) {
    const key = getKey(pass);
    const cipher = crypto.createCipheriv(this.algo, key, this.iv);

    return [
      cipher.update(data, TEXT_ENCODING, CIPHER_ENCODING),
      cipher.final(CIPHER_ENCODING),
    ].join('');
  }

  decrypt(pass, data) {
    const key = getKey(pass);
    const decipher = crypto.createDecipheriv(this.algo, key, this.iv)

    return [
      decipher.update(data, CIPHER_ENCODING, TEXT_ENCODING),
      decipher.final(TEXT_ENCODING),
    ].join('');
  }
}

module.exports = Cipher;
