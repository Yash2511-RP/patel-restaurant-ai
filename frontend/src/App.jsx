import { useMemo, useState } from "react";

export default function App() {
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000/api/ask-ai";

  const cards = [
    { title: "Today's Sales", value: "$4,860", sub: "+8.2% vs yesterday" },
    { title: "Low Stock Items", value: "7", sub: "Cheese, Fries, Bread, Sauces" },
    { title: "Staff On Shift", value: "12", sub: "4 kitchen • 5 front • 3 delivery" },
    { title: "AI Alerts", value: "3", sub: "Inventory and sales insights ready" },
  ];

  const insights = [
    "Paneer Pizza is your top-selling item this week.",
    "Cheese stock may run low in the next 2 days.",
    "Weekend dinner sales are trending higher than last week.",
  ];

  const modules = [
    "AI Assistant",
    "Sales Reports",
    "Inventory",
    "Payroll",
    "Staff Scheduling",
    "Vendors",
  ];

  const quickQuestions = [
    "sales",
    "top selling item",
    "employees",
    "inventory",
  ];

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello Raja, I’m ready to help with sales, inventory, employees, and restaurant insights.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => {
    const userCount = messages.filter((msg) => msg.role === "user").length;
    const aiCount = messages.filter((msg) => msg.role === "ai").length;
    return { userCount, aiCount };
  }, [messages]);

  const askAI = async (customQuestion) => {
    const finalQuestion = (customQuestion ?? question).trim();
    if (!finalQuestion || loading) return;

    const userMessage = { role: "user", text: finalQuestion };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: finalQuestion }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.answer || "No answer received." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Backend connection failed. Please check your API server or deployed backend URL.",
        },
      ]);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      askAI();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "New chat started. Ask me about sales, top items, employees, or inventory.",
      },
    ]);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patel Restaurant AI</h1>
            <p className="text-sm text-slate-500">Cloud dashboard for restaurant operations</p>
          </div>
          <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow">
            Live Dashboard
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-sm text-slate-500">{card.title}</p>
              <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
              <p className="mt-2 text-sm text-emerald-600">{card.sub}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">AI Assistant</h3>
                <p className="text-sm text-slate-500">
                  Ask about sales, inventory, payroll, employees, and restaurant insights
                </p>
              </div>
              <button
                onClick={clearChat}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                New Chat
              </button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {quickQuestions.map((item) => (
                <button
                  key={item}
                  onClick={() => askAI(item)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="max-h-[420px] space-y-4 overflow-y-auto rounded-3xl bg-slate-50 p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.role === "user"
                      ? "ml-auto max-w-xl rounded-3xl bg-slate-900 px-4 py-3 text-sm text-white shadow"
                      : "max-w-2xl rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow ring-1 ring-slate-200"
                  }
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="max-w-2xl rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow ring-1 ring-slate-200">
                  AI is thinking...
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Ask AI about restaurant operations..."
              />
              <button
                onClick={() => askAI()}
                disabled={loading}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold">AI Insights</h3>
              <div className="mt-4 space-y-3">
                {insights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold">Modules</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {modules.map((module) => (
                  <div
                    key={module}
                    className="rounded-2xl bg-slate-50 p-4 text-center text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                  >
                    {module}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold">Chat Summary</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  User messages: <span className="font-semibold">{stats.userCount}</span>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  AI replies: <span className="font-semibold">{stats.aiCount}</span>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  API URL: <span className="break-all font-semibold">{API_URL}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}