const { createConnection } = require('typeorm');

module.exports = (url, type = 'postgres') => createConnection({
  url,
  type,
  entities: [
    require('./entities/Secret'),
  ],
  logging: true,
  dropSchema: true,
  synchronize: true,
});
