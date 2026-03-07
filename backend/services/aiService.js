const db = require("../config/db");

const getAIResponse = async (question) => {
  const q = question.toLowerCase().trim();

  if (q.includes("top selling") || q.includes("best selling")) {
    if (!db) return "Database is not connected.";

    const [rows] = await db.promise().query(`
      SELECT menu_items.name, SUM(sale_items.quantity) AS total
      FROM sale_items
      JOIN menu_items ON sale_items.item_id = menu_items.id
      GROUP BY sale_items.item_id, menu_items.name
      ORDER BY total DESC
      LIMIT 1
    `);

    if (rows.length > 0) {
      return `Top selling item is ${rows[0].name}`;
    }

    return "No sales data found.";
  }

  if (q.includes("sales")) {
    if (!db) return "Database is not connected.";

    const [rows] = await db.promise().query(
      "SELECT SUM(total_amount) AS total FROM orders WHERE DATE(created_at) = CURDATE()"
    );

    return `Today's total sales are $${rows[0].total || 0}`;
  }

  if (q.includes("employee") || q.includes("employees") || q.includes("staff")) {
    if (!db) return "Database is not connected.";

    const [rows] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM employees"
    );

    return `You currently have ${rows[0].total} employees.`;
  }

  if (q.includes("inventory") || q.includes("stock")) {
    return "Inventory module is connected next.";
  }

  if (q.includes("payroll")) {
    return "Payroll module is ready for integration.";
  }

  return "AI is still learning.";
};

module.exports = { getAIResponse };
