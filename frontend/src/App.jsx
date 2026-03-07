import { useEffect, useState } from "react";
import { askAI } from "./services/api";
import { getDashboardData } from "./services/dashboard";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);

  const quickQuestions = [
    "show tables",
    "sales",
    "inventory",
    "employees",
    "orders",
  ];

  useEffect(() => {
    async function loadDashboard() {
      const data = await getDashboardData();
      if (data.success) {
        setDashboard(data.stats);
      }
    }
    loadDashboard();
  }, []);

  const handleAsk = async (customQuestion) => {
    const finalQuestion = customQuestion || question;
    if (!finalQuestion.trim()) return;

    setLoading(true);
    setAnswer("");

    const res = await askAI(finalQuestion);

    if (res.success) {
      setAnswer(res.answer);
    } else {
      setAnswer(res.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="hero">
          <div>
            <h1>Patel Restaurant AI</h1>
            <p>Smart assistant for restaurant operations.</p>
          </div>
          <div className="status-badge">Live Dashboard</div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Tables</h3>
            <p className="stat-value">
              {dashboard ? dashboard.totalTables : "..."}
            </p>
            <span>Connected to Supabase</span>
          </div>

          <div className="stat-card">
            <h3>Backend Status</h3>
            <p className="stat-value">Live</p>
            <span>Render API connected</span>
          </div>

          <div className="stat-card">
            <h3>Frontend Status</h3>
            <p className="stat-value">Live</p>
            <span>Vercel deployed</span>
          </div>

          <div className="stat-card">
            <h3>Database</h3>
            <p className="stat-value">Ready</p>
            <span>Real data available</span>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="assistant-card">
            <div className="assistant-header">
              <div>
                <h2>AI Assistant</h2>
                <p>Ask about sales, inventory, employees, and tables.</p>
              </div>
            </div>

            <div className="quick-actions">
              {quickQuestions.map((item) => (
                <button
                  key={item}
                  className="quick-btn"
                  onClick={() => {
                    setQuestion(item);
                    handleAsk(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="chat-box">
              <div className="message ai-message">
                Hello Raja, your restaurant AI is connected.
              </div>

              {question && <div className="message user-message">{question}</div>}

              {loading && (
                <div className="message ai-message">Loading answer...</div>
              )}

              {answer && !loading && (
                <div className="message ai-message">{answer}</div>
              )}
            </div>

            <div className="input-row">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask AI about restaurant operations..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAsk();
                }}
              />
              <button className="primary-btn" onClick={() => handleAsk()}>
                Send
              </button>
            </div>
          </div>

          <div className="side-panel">
            <div className="panel-card">
              <h3>Database Tables</h3>
              {dashboard?.tables?.length ? (
                <ul>
                  {dashboard.tables.map((table) => (
                    <li key={table}>{table}</li>
                  ))}
                </ul>
              ) : (
                <p>Loading tables...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;