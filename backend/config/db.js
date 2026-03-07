const mysql = require("mysql2");

let db = null;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "restaurant_db",
    port: process.env.DB_PORT || 8889
  });

  db.connect(err => {
    if (err) {
      console.log("Database not connected (cloud mode)");
    } else {
      console.log("Connected to MySQL database");
    }
  });

} catch {
  console.log("Database skipped for cloud deploy");
}

module.exports = db;