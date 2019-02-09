const SEED = process.env.SEED || 'not-very-random-secret';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  SEED,
  ENVIRONMENT,
  DATABASE_URL,
};
