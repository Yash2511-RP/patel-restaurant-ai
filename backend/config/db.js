const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_PASS exists:", !!process.env.DB_PASS);
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to Supabase PostgreSQL");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error full:");
    console.error(err);
  }
})();

module.exports = pool;