import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const host = process.env.API_HOST || 'localhost';
const port = process.env.API_PORT || '3000';

const apiBaseUrl = `http://${host}:${port}`;

const postgresHost = process.env.POSTGRES_HOST || 'localhost';
const postgresPort = parseInt(process.env.POSTGRES_PORT) || 5432;
const postgresUsername = process.env.POSTGRES_USERNAME;
const postgresPassword = process.env.POSTGRES_USERNAME;
const postgresDatabase = process.env.POSTGRES_DATABASE || 'development';

export {
  env,
  host,
  port,
  apiBaseUrl,
  postgresHost,
  postgresPort,
  postgresUsername,
  postgresPassword,
  postgresDatabase,
};
