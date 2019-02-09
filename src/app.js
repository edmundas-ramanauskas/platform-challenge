import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import createLogger from './lib/logger';
import Cipher from './services/Cipher';
import Secrets from './services/Secrets';
import createConnection from './database';
import indexRouter from './routes/index';
import storeRouter from './routes/store';
import { SEED, DATABASE_URL } from './config';

const createApp = async () => {
  const app = express();
  const logger = createLogger('alacrity');
  const cipher = new Cipher(SEED);
  const connection = await createConnection(DATABASE_URL);
  const secrets = new Secrets({ cipher, connection, logger });

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', indexRouter);
  app.use('/storage', storeRouter({ logger, secrets }));

  return app;
};

// eslint-disable-next-line import/no-commonjs
module.exports = createApp;
