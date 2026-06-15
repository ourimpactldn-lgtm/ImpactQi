import { useEffect, useRef, useState } from "react";

const quickPrompts = [
  "Can you explain your automation work?",
  "How do you support film and storytelling?",
  "What about research and evaluation?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = window.localStorage.getItem("impactqi-chat");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [
      {
        role: "bot",
        text: "Hello. I am the Impact QI Assistant. I can help with questions about research, public health, documentary storytelling, automation, and training.",
        timestamp: Date.now(),
      },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("impactqi-chat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 180);
    }
  }, [isOpen]);

  const sendMessage = async (overrideText) => {
    const currentText = (overrideText ?? input).trim();
    if (!currentText || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: currentText, timestamp: Date.now() },
    ]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "I am here to help. Please ask a question about our work or services.",
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I am sorry, I could not reply just now. Please try again or contact us directly for a tailored conversation.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Chat cleared. I can assist with questions about our services, projects, and expertise.",
        timestamp: Date.now(),
      },
    ]);
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1100 }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle assistant"
        style={{
          border: "none",
          background: "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(96,165,250,0.95))",
          boxShadow: "0 16px 36px rgba(37,99,235,0.35)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px 10px 10px",
          borderRadius: "999px",
          cursor: "pointer",
          color: "white",
          animation: "floatAvatar 2.8s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0F172A, #1E3A8A)",
            border: "2px solid rgba(255,255,255,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 1,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
        QI
        </div>
        <div style={{ textAlign: "left", lineHeight: 1.2 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>Impact QI</div>
          <div style={{ fontSize: 11, opacity: 0.9 }}>Ask me anything</div>
        </div>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 74,
            width: "min(420px, calc(100vw - 24px))",
            maxHeight: "min(640px, calc(100vh - 24px))",
            background: "rgba(7, 17, 31, 0.97)",
            border: "1px solid rgba(96, 165, 250, 0.3)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "14px 16px", background: "rgba(37, 99, 235, 0.16)", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, color: "#E0F2FE" }}>Impact QI Assistant</div>
              <div style={{ fontSize: 12, color: "#93C5FD" }}>Professional support for your questions</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={clearChat} style={{ background: "transparent", border: "none", color: "#CBD5E1", cursor: "pointer", fontSize: 15 }} aria-label="Clear chat">🗑️</button>
              <button type="button" onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", color: "#CBD5E1", cursor: "pointer", fontSize: 18 }} aria-label="Close chat">✕</button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: "linear-gradient(180deg, rgba(10,18,34,0.95), rgba(7,17,31,1))" }}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} style={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "88%" }}>
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 16,
                      background: message.role === "user" ? "linear-gradient(135deg, #2563EB, #60A5FA)" : "rgba(255,255,255,0.08)",
                      color: "#F8FAFC",
                      fontSize: 14,
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message.text}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 4, textAlign: message.role === "user" ? "right" : "left" }}>{message.timestamp ? formatTime(message.timestamp) : ""}</div>
                </div>
              </div>
            ))}

            {!loading && messages.length <= 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    style={{ padding: "8px 10px", borderRadius: 999, border: "1px solid rgba(96,165,250,0.25)", background: "rgba(255,255,255,0.05)", color: "#E2E8F0", cursor: "pointer", fontSize: 12 }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#93C5FD", fontSize: 13 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#93C5FD", display: "inline-block", animation: "pulse 1s ease-in-out infinite" }} />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our work, services, or projects..."
                style={{ flex: 1, borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "#F8FAFC", padding: "10px 12px", outline: "none", fontSize: 14 }}
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading}
                style={{ border: "none", borderRadius: 999, padding: "10px 14px", background: "linear-gradient(135deg, #2563EB, #60A5FA)", color: "white", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes floatAvatar {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
