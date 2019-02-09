const SEED = process.env.SEED || 'not-very-random-secret';
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  SEED,
  DATABASE_URL,
};
