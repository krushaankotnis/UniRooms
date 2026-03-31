import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [hostels, setHostels] = useState<any[]>([]);

  // ✅ Fetch hostels
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const snapshot = await getDocs(collection(db, "hostels"));
        const data = snapshot.docs.map(doc => doc.data());
        setHostels(data);
      } catch (err) {
        console.error("Firestore Error:", err);
      }
    };

    fetchHostels();
  }, []);

  // ✅ Gemini API
  const sendMessage = async () => {
  if (!input) return;

  const userText = input;

  setMessages((prev) => [...prev, "You: " + userText]);
  setInput("");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=AIzaSyB2H1a7veMrSFEDY58s-iAxprFt_FQgLm8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are a helpful hostel assistant.

Hostel data:
${JSON.stringify(hostels)}

User: ${userText}
                  `,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    const data = await response.json();

    console.log("FULL GEMINI RESPONSE:", data);

    let botReply = "No response from AI";

    // ✅ FINAL SAFE PARSER
    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;

      if (content && content.parts) {
        botReply = content.parts.map((p: any) => p.text || "").join("");
      }
    } else if (data.error) {
      botReply = "Error: " + data.error.message;
    }

    setMessages((prev) => [...prev, "Bot: " + botReply]);

  } catch (err) {
    console.error("API Error:", err);

    setMessages((prev) => [
      ...prev,
      "Bot: API request failed",
    ]);
  }
};

  return (
  <>
    {/* 💬 Floating Button */}
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999999,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#2563eb",
          color: "white",
          padding: "14px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          fontSize: "18px",
        }}
      >
        💬
      </button>
    </div>

    {/* 💬 Chatbox */}
    {open && (
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "340px",
          height: "450px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 999999,
        }}
      >

        {/* Header */}
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          UniRooms Assistant 🤖
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {messages.map((msg, i) => {
            const isUser = msg.startsWith("You:");

            return (
              <div
                key={i}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  background: isUser ? "#2563eb" : "#f1f1f1",
                  color: isUser ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  maxWidth: "75%",
                  fontSize: "14px",
                }}
              >
                {msg.replace("You: ", "").replace("Bot: ", "")}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #ddd",
            padding: "8px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
            }
        }}
             placeholder="Ask about hostel..."
             style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "8px",
            fontSize: "14px",
            }}
            />

          <button
            onClick={sendMessage}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

      </div>
    )}
  </>
);
}