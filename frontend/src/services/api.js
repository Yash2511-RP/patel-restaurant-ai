const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function askAI(question) {
  try {
    const response = await fetch(`${API_URL}/api/ask-ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API error:", error);
    return {
      success: false,
      error: "Backend connection failed",
    };
  }
}