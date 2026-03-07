const db = require("../config/db");

const getAIResponse = async (question) => {
  const q = question.toLowerCase().trim();

  try {

    // TOP SELLING ITEM
    if (q.includes("top selling") || q.includes("best selling")) {

      const [rows] = await db.promise().query(`
        SELECT menu_items.name, SUM(sale_items.quantity) AS total
        FROM sale_items
        JOIN menu_items ON sale_items.item_id = menu_items.id
        GROUP BY menu_items.name
        ORDER BY total DESC
        LIMIT 1
      `);

      if (rows.length > 0) {
        return `Top selling item is ${rows[0].name}`;
      }

      return "No sales data found.";
    }

    // SALES
    if (q.includes("sales")) {

      const [rows] = await db.promise().query(`
        SELECT SUM(total) AS total_sales
        FROM orders
      `);

      return `Total restaurant sales are $${rows[0].total_sales || 0}`;
    }

    // EMPLOYEES
    if (q.includes("employee") || q.includes("staff")) {

      const [rows] = await db.promise().query(`
        SELECT COUNT(*) AS total
        FROM employees
      `);

      return `You currently have ${rows[0].total} employees.`;
    }

    // INVENTORY
    if (q.includes("inventory") || q.includes("stock")) {
      return "Inventory module is connected.";
    }

    // PAYROLL
    if (q.includes("payroll")) {
      return "Payroll records are available in payroll_records table.";
    }

    return "AI is still learning.";

  } catch (error) {
    console.error("AI SQL Error:", error);
    return "Database query failed.";
  }
};

module.exports = { getAIResponse };
