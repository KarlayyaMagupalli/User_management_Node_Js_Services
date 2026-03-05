const mysql = require("mysql2/promise");
const { db } = require("./env");

const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password || "",
  port: db.port,
  database: db.database,
  waitForConnections: true,
  connectionLimit: db.connectionLimit || 10,
  queueLimit: 0,
});

// ✅ Test connection (separate async IIFE)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1);
  }
})();

module.exports = pool;
