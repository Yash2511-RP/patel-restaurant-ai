const pool = require("../config/db");

async function getTableNames() {
  const result = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `);

  return result.rows.map((row) => row.table_name);
}

async function safeQuery(query, params = []) {
  try {
    const result = await pool.query(query, params);
    return {
      ok: true,
      rows: result.rows,
    };
  } catch (error) {
    console.error("Query failed:", error.message);
    return {
      ok: false,
      error: error.message,
      rows: [],
    };
  }
}

async function getAIResponse(question) {
  try {
    const q = String(question || "").trim().toLowerCase();

    if (!q) {
      return "Please ask a valid question.";
    }

    const tables = await getTableNames();

    if (!tables.length) {
      return "Database is connected, but no tables were found.";
    }

    if (
      q.includes("show tables") ||
      q.includes("table") ||
      q.includes("tables") ||
      q.includes("database")
    ) {
      return `Available tables: ${tables.join(", ")}`;
    }

    if (q.includes("sales") || q.includes("sale") || q.includes("revenue")) {
      if (!tables.includes("sales")) {
        return `No table named sales found. Available tables: ${tables.join(", ")}`;
      }

      const result = await safeQuery(`
        SELECT *
        FROM sales
        ORDER BY id DESC
        LIMIT 10
      `);

      if (!result.ok) {
        return `Sales query failed: ${result.error}`;
      }

      if (!result.rows.length) {
        return "Sales table exists, but no sales data was found.";
      }

      return `Latest sales records: ${JSON.stringify(result.rows)}`;
    }

    if (q.includes("employee") || q.includes("staff") || q.includes("worker")) {
      if (!tables.includes("employees")) {
        return `No table named employees found. Available tables: ${tables.join(", ")}`;
      }

      const result = await safeQuery(`
        SELECT *
        FROM employees
        ORDER BY id DESC
        LIMIT 10
      `);

      if (!result.ok) {
        return `Employees query failed: ${result.error}`;
      }

      if (!result.rows.length) {
        return "Employees table exists, but no employee data was found.";
      }

      return `Latest employee records: ${JSON.stringify(result.rows)}`;
    }

    if (q.includes("inventory") || q.includes("stock") || q.includes("item")) {
      if (!tables.includes("inventory")) {
        return `No table named inventory found. Available tables: ${tables.join(", ")}`;
      }

      const result = await safeQuery(`
        SELECT *
        FROM inventory
        ORDER BY id DESC
        LIMIT 10
      `);

      if (!result.ok) {
        return `Inventory query failed: ${result.error}`;
      }

      if (!result.rows.length) {
        return "Inventory table exists, but no inventory data was found.";
      }

      return `Latest inventory records: ${JSON.stringify(result.rows)}`;
    }

    if (q.includes("order")) {
      if (!tables.includes("orders")) {
        return `No table named orders found. Available tables: ${tables.join(", ")}`;
      }

      const result = await safeQuery(`
        SELECT *
        FROM orders
        ORDER BY id DESC
        LIMIT 10
      `);

      if (!result.ok) {
        return `Orders query failed: ${result.error}`;
      }

      if (!result.rows.length) {
        return "Orders table exists, but no order data was found.";
      }

      return `Latest order records: ${JSON.stringify(result.rows)}`;
    }

    return `Database is connected and working. Available tables: ${tables.join(", ")}. Ask about sales, employees, inventory, orders, or show tables.`;
  } catch (error) {
    console.error("AI Service Error:", error);
    return `Database query failed: ${error.message}`;
  }
}

module.exports = { getAIResponse };