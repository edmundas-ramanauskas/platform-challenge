'use strict';

const express = require('express');
const morgan = require('morgan');
const Cipher = require('./services/Cipher');
const Secrets = require('./services/Secrets');
const createConnection = require('./database');
const indexRouter = require('./routes/index');
const storeRouter = require('./routes/store');
const { SEED, ENVIRONMENT, DATABASE_URL } = require('./config');

const createApp = async () => {
  const app = express();
  const cipher = new Cipher(SEED);
  const connection = await createConnection(DATABASE_URL);
  const secrets = new Secrets({ cipher, connection });

  app.use(morgan(ENVIRONMENT));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', indexRouter);
  app.use('/storage', storeRouter({ secrets }));

  return app;
}

module.exports = createApp;
