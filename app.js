'use strict';

const express = require('express');
const morgan = require('morgan');
const createLogger = require('./lib/logger');
const Cipher = require('./services/Cipher');
const Secrets = require('./services/Secrets');
const createConnection = require('./database');
const indexRouter = require('./routes/index');
const storeRouter = require('./routes/store');
const { SEED, DATABASE_URL } = require('./config');

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
}

module.exports = createApp;
