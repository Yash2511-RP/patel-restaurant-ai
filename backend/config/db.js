const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 8889),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "restaurant_db",
};

let db;

try {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Connected to MySQL database");
    }
  });
} catch (error) {
  console.error("Database setup error:", error.message);
}

module.exports = db;