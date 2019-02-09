import { EntitySchema } from 'typeorm';
import { Secret } from '../models';

const Schema = new EntitySchema({
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

export default Schema;
