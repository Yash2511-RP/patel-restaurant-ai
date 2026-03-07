const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log("Connected to Supabase"))
  .catch(err => console.error("Database connection error:", err));

module.exports = pool;