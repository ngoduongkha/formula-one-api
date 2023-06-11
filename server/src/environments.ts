import * as dotenv from 'dotenv';

dotenv.config();

export const POSTGRES = {
  HOST: process.env.POSTGRES_HOST || 'localhost',
  PORT: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DATABASE,
};
