const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getDashboardData() {
  try {
    const response = await fetch(`${API_URL}/api/dashboard`);
    return await response.json();
  } catch (error) {
    console.error("Dashboard API error:", error);
    return {
      success: false,
      error: "Failed to load dashboard",
    };
  }
}