import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { askPolicyQuestion } from "../services/policyService";

const ChatBox = () => {
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await askPolicyQuestion(userText);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: res.data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px",
          minHeight: 0,
        }}
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {loading && <p style={{ color: "#94a3b8" }}>Thinking...</p>}

        {/* 🔥 THIS WAS MISSING (CRITICAL) */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #334155",
          padding: "10px",
          background: "#1e293b",
          flexShrink: 0,
        }}
      >
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            background: "#0f172a",
            color: "#fff",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about company policies..."
        />

        <button
          onClick={handleSend}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;