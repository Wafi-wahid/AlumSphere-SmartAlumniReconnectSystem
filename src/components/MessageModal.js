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

  // ✅ Auto scroll to bottom when new message added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  const handleSend = async () => {
    if (!message.trim()) return alert("Please type a message!");
    
    setIsSending(true);
    
    try {
      // ✅ Add message to local state FIRST (instant feedback)
      const newMessage = {
        text: message.trim(),
        sender: "You",
        timestamp: new Date(),
      };
      setMessageHistory(prev => [...prev, newMessage]);
      
      // ✅ Clear input immediately
      setMessage("");
      
      // ✅ Send to backend
      await sendMessage(recipient, message.trim());
      
      console.log("✅ Message sent successfully");
      
      // ❌ DON'T CLOSE MODAL - Let user continue chatting
      // onClose(); // REMOVED THIS LINE!
      
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

  return (
    <div className="overlay">
      <div className="message-card">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Header */}
        <div className="header">
          <img src={image} alt={recipient} className="profile-img" />
          <div className="header-text">
            <h3>{recipient}</h3>
            <p className="role">{role}</p>
          </div>
        </div>

        {/* ✅ Messages Display Area */}
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

        {/* Message Input */}
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