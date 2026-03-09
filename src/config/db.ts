import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('../../knexfile.js');
const db = knex(knexConfig);

export default db;
