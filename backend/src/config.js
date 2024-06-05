const { config } = require("dotenv");
config();
const TOKEN_SECRET='some_secret_key3';
module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTPG,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
  TOKEN_SECRET
};
