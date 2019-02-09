const { Like } = require('typeorm');
const { Secret } = require('../database/models');

class Secrets {
  constructor({ cipher, connection, logger }) {
    this.cipher = cipher;
    this.connection = connection;
    this.logger = logger;
  }

  decrypt(pass, value) {
    try {
      const decrypted = this.cipher.decrypt(pass, value);
      // JSON.parse will fail if decryption key was wrong
      return JSON.parse(decrypted);
    } catch (error) {
      this.logger.error('DECRYPTION_ERROR', { error });
      throw error;
    }
  }

  saveSecret({ id, value }, pass) {
    const content = JSON.stringify(value);
    const encrypted = this.cipher.encrypt(pass, content);
    const secretsRepository = this.connection.getRepository(Secret);
    const secret = new Secret(id, encrypted);
    return secretsRepository.save(secret);
  }

  async findSecretById(id, pass) {
    const secretsRepository = this.connection.getRepository(Secret);
    const { value, ...secret } = await secretsRepository.findOne(id);
    const decrypted = this.decrypt(pass, value);
    return { ...secret, value: decrypted };
  }

  async findSecretsByPrefix(prefix, pass) {
    const secretsRepository = this.connection.getRepository(Secret);
    const secrets = await secretsRepository.find({
      id: Like(prefix),
    });
    return secrets.map(({ value, ...secret }) => {
      try {
        const decrypted = this.decrypt(pass, value);
        return { ...secret, value: decrypted };
      } catch {
        // ignore secret if decryption fails
        return null;
      }
    }).filter(secret => !!secret);
  }

  async findSecrets(id, pass) {
    if (id.endsWith('*')) {
      // find secrets by id prefix
      const prefix = `${id.slice(0, -1)}%`;
      const secrets = await this.findSecretsByPrefix(prefix, pass);
      return secrets;
    } 
    // find secret by exact id
    const secret = await this.findSecretById(id, pass);
    return [secret];
  }
}

module.exports = Secrets;
