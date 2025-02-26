import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
