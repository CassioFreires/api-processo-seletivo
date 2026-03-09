const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Freires2@',
    database: process.env.DB_NAME || 'processo-seletivo',
  },
  migrations: {
    directory: './src/migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
  useNullAsDefault: true,
};
