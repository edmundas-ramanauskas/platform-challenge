const crypto = require('crypto');

class Cipher {
  constructor(iv, algo = 'aes-256-ctr') {
    this.iv = iv.slice(0, 16);
    this.algo = algo;
  }

  getKey(pass) {
    return crypto.createHash('sha256')
      .update(pass)
      .digest('base64')
      .substr(0, 32);
  }

  encrypt(pass, data) {
    const key = this.getKey(pass);
    const cipher = crypto.createCipheriv(this.algo, key, this.iv);

    return [
      cipher.update(data, 'utf8', 'hex'),
      cipher.final('hex'),
    ].join('');
  }

  decrypt(pass, data) {
    const key = this.getKey(pass);
    const decipher = crypto.createDecipheriv(this.algo, key, this.iv)

    return [
      decipher.update(data, 'hex', 'utf8'),
      decipher.final('utf8'),
    ].join('');
  }
}

module.exports = Cipher;
