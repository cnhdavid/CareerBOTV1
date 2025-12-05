import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SettingsModal from "./components/SettingsModal";
import { Search, Paperclip, Send } from "lucide-react";
import "./App.css";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("dark");

  // NEU
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setAnswer(data?.text || "Keine Antwort erhalten.");
    } catch (e) {
      setAnswer("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="app-root">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSettings={() => setShowSettings(true)}
      />

      <div className="topbar">
        {!sidebarOpen && (
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        )}
        <span className="mobile-brand">CareerBOT</span>
      </div>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main">
        <div className="desktop-center">
          <h1>Wobei kann ich helfen?</h1>

          {/* NEU: kleine Ausgabe */}
          {(loading || answer) && (
            <div className="assistant-preview">
              {loading ? "Schreibe..." : answer}
            </div>
          )}

          <div className="input-box">
            <Search />
            <input
              placeholder="Fragen Sie irgendetwas..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button className="icon-btn" type="button">
              <Paperclip />
            </button>

            <button
              className="send-btn"
              type="button"
              onClick={handleSend}
              disabled={loading}
            >
              <Send />
            </button>
          </div>
        </div>
      </main>

      {showSettings && (
        <SettingsModal
          theme={theme}
          setTheme={setTheme}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
