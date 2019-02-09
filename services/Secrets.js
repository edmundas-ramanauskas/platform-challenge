const { Like } = require('typeorm');
const { Secret } = require('../database/models');

class Secrets {
  constructor({ cipher, connection }) {
    this.cipher = cipher;
    this.connection = connection;
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
    const decrypted = this.cipher.decrypt(pass, value);
    return { ...secret, value: JSON.parse(decrypted) };
  }

  async findSecretsByPrefix(prefix, pass) {
    const secrets = await secretsRepository.find({
      id: Like(prefix),
    });
    return secrets.map(({ value, ...secret }) => {
      const decrypted = this.cipher.decrypt(pass, value);
      return { ...secret, value: JSON.parse(decrypted) };
    });
  }

  async findSecrets(id, pass) {
    if (id.endsWith('*')) {
      // find secrets by id prefix
      const prefix = `${id.slice(0, -1)}%`;
      const secrets = await this.findSecretsByPrefix(prefix, pass);
      return secrets;
    } else {
      // find secret by id
      const secret = await this.findSecretById(id, pass);
      return [secret];
    }
  }
}

module.exports = Secrets;
