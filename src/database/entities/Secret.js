const { EntitySchema } = require('typeorm');
const { Secret } = require('../models');

module.exports = new EntitySchema({
  name: 'Secret',
  target: Secret,
  tableName: 'secrets',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
    },
    value: {
      type: 'text',
    },
  },
});
