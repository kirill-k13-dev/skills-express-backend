const dotenv = require('dotenv');

const env = dotenv.config({path: '.env'}).parsed || process.env;

module.exports = {
  app: {
    frontUrl: env.FRONT_URL || 'http://127.0.0.1:3001',
    domain: process.env.APP_URL || env.APP_URL || 'http://127.0.0.1',
    port: process.env.PORT || env.PORT || 3001,
    env: env.ENV || 'development',
  },
  logging: {
    filePath: env.LOG_FILEPATH || 'logs/',
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  },
};
