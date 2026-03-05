const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
  },
};
