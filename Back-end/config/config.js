require('dotenv').config();

export const development = {
  url: process.env.DEV_DATABASE_URL,
  dialect: 'postgres',
  logging: false,
};
export const test = {
  url: process.env.TEST_DATABASE_URL,
  dialect: 'postgres',
  logging: false,
};
export const production = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  logging: false,
};
