import { createConnection } from 'typeorm';
import Secret from './entities/Secret';

export default (url, type = 'postgres') => createConnection({
  url,
  type,
  entities: [Secret],
  logging: true,
  // dropSchema: true,
  synchronize: true,
});
