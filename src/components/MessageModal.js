// src/components/MessageModal.jsx
import React, { useState, useEffect, useRef } from "react";
import "./MessageModal.css";
import { Send } from "lucide-react";
import { sendMessage } from "../services/messageService";

const MessageModal = ({ recipient, role, image, onClose }) => {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Example templates (you can customize)
  const messageTemplates = [
    "Hi there! Thanks for connecting 😊",
    "It was great meeting you!",
    "Looking forward to collaborating!",
    "Can we schedule a quick chat?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  const handleSend = async () => {
    if (!message.trim()) return alert("Please type a message!");
    
    setIsSending(true);
    
    try {
      const newMessage = {
        text: message.trim(),
        sender: "You",
        timestamp: new Date(),
      };
      setMessageHistory(prev => [...prev, newMessage]);
      setMessage("");
      await sendMessage(recipient, message.trim());
      console.log("✅ Message sent successfully");
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ✅ When user clicks a template, fill it into input box
  const handleTemplateClick = (text) => {
    setMessage(text);
  };

  return (
    <div className="overlay">
      <div className="message-card">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="header">
          <img src={image} alt={recipient} className="profile-img" />
          <div className="header-text">
            <h3>{recipient}</h3>
            <p className="role">{role}</p>
          </div>
        </div>

        <div className="messages-container">
          {messageHistory.length === 0 ? (
            <p className="info-text">Start a conversation with {recipient}</p>
          ) : (
            messageHistory.map((msg, index) => (
              <div key={index} className="message-bubble sent">
                <p className="message-text">{msg.text}</p>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ✅ Message Templates Section */}
        <div className="templates-bar">
          {messageTemplates.map((template, index) => (
            <button
              key={index}
              className="template-btn"
              onClick={() => handleTemplateClick(template)}
            >
              {template}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending}
          />
          <button 
            className="send-btn" 
            onClick={handleSend}
            disabled={isSending}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
