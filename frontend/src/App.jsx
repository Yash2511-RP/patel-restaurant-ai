export default function App() {
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
            <div key={card.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">{card.title}</p>
              <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
              <p className="mt-2 text-sm text-emerald-600">{card.sub}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">AI Assistant</h3>
                <p className="text-sm text-slate-500">Ask about sales, inventory, payroll, and staffing</p>
              </div>
              <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                New Chat
              </button>
            </div>

            <div className="space-y-4 rounded-3xl bg-slate-50 p-4">
              <div className="ml-auto max-w-xl rounded-3xl bg-slate-900 px-4 py-3 text-sm text-white shadow">
                What items are selling best this week?
              </div>
              <div className="max-w-2xl rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow ring-1 ring-slate-200">
                Your best-selling item this week is <span className="font-semibold">Paneer Pizza</span>. Garlic Bread and Masala Fries are also performing strongly. Dinner hours between 6 PM and 9 PM show the highest sales volume.
              </div>
              <div className="ml-auto max-w-xl rounded-3xl bg-slate-900 px-4 py-3 text-sm text-white shadow">
                Any inventory issue today?
              </div>
              <div className="max-w-2xl rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow ring-1 ring-slate-200">
                Yes. Cheese stock is lower than expected based on current sales pace. Suggested action: place a vendor order today to avoid shortage tomorrow night.
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <input
                className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                placeholder="Ask AI about restaurant operations..."
              />
              <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                Send
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold">AI Insights</h3>
              <div className="mt-4 space-y-3">
                {insights.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold">Modules</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {modules.map((module) => (
                  <div key={module} className="rounded-2xl bg-slate-50 p-4 text-center text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                    {module}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}