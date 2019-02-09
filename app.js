'use strict';

const express = require('express');
const logger = require('morgan');
const Cipher = require('./services/cipher');
const indexRouter = require('./routes/index');
const storeRouter = require('./routes/store');
const { SEED } = require('./config');

const app = express();
const cipher = new Cipher(SEED);
const context = { cipher };

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/storage', storeRouter(context));

module.exports = app;
