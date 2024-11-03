const dotenv = require('dotenv');
dotenv.config({path: `.env.${(process.env.NODE_ENV).trim()}`});

// Database configuration based on NODE_ENV
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
};

console.log(config[(process.env.NODE_ENV).trim()])
// Export the configuration
module.exports = config[(process.env.NODE_ENV).trim()];
