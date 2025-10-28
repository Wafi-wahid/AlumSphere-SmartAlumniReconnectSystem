import React, { useState, useEffect } from "react";
import "./AlumniCard.css";
import { FaCommentDots } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { IoMdArrowRoundUp } from "react-icons/io"; // ✅ Up arrow icon
import {
  db,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "../firebase";

function AlumniCard({
  id,
  name,
  class: year,
  major,
  role,
  company,
  location,
  description,
  skills,
  image,
  email,
}) {
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const currentUser = {
    uid: "current-user-123",
    displayName: "Current User",
    email: "user@example.com",
  };

  useEffect(() => {
    if (showChatPopup) {
      loadMessages();
    } else if (unsubscribe) {
      unsubscribe();
      setUnsubscribe(null);
    }
  }, [showChatPopup]);

  const loadMessages = () => {
    if (!id) return;
    const conversationId = [currentUser.uid, id].sort().join("_");

    const messagesQuery = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId),
      orderBy("timestamp", "asc")
    );

    const messagesUnsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = [];
      snapshot.forEach((doc) => messagesData.push({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    setUnsubscribe(() => messagesUnsubscribe);
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !id) return;
    setLoading(true);

    try {
      const conversationId = [currentUser.uid, id].sort().join("_");
      const newMessage = {
        text: messageText.trim(),
        senderId: currentUser.uid,
        senderName: currentUser.displayName,
        receiverId: id,
        receiverName: name,
        timestamp: serverTimestamp(),
        participants: [currentUser.uid, id],
        conversationId,
        read: false,
      };

      // ✅ Instantly update UI
      setMessages((prev) => [...prev, { ...newMessage, id: Date.now() }]);
      setMessageText("");

      await addDoc(collection(db, "messages"), newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Message not sent.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      if (timestamp.toDate) {
        const date = timestamp.toDate();
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      return "";
    } catch {
      return "";
    }
  };

  return (
    <div className="alumni-card">
      {showChatPopup && (
        <div className="chat-popup-overlay" onClick={() => setShowChatPopup(false)}>
          <div className="chat-popup" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
      
              <button className="close-chat" onClick={() => setShowChatPopup(false)}>
                ×
              </button>
            </div>

            <div className="chat-user-info">
              <img src={image || "/default-avatar.png"} alt={name} className="chat-pic" />
              <div className="chat-user-details">
                <h5>{name}</h5>
                <p>{role} at {company}</p>
              </div>
            </div>

            <div className="chat-divider"></div>

            <div className="messages-container">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.senderId === currentUser.uid ? "sent" : "received"}`}
                  >
                    <div className="message-text">{msg.text}</div>
                    <div className="message-time">{formatTime(msg.timestamp)}</div>
                  </div>
                ))
              ) : (
                <div className="no-messages">📝 No messages yet. Start the conversation!</div>
              )}
            </div>

            <div className="message-input-container">
              <div className="input-wrapper">
                <textarea
                  className="chat-input"
                  placeholder="Type your message..."
                  rows="3"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                ></textarea>
                <button
                  className="send-icon-btn"
                  onClick={sendMessage}
                  disabled={loading || !messageText.trim()}
                >
                  {loading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <IoMdArrowRoundUp className="send-icon" /> // ✅ blue arrow icon
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card-header">
        <img src={image || "/default-avatar.png"} alt={name} className="profile-pic" />
        <div className="header-text">
          <h3>{name}</h3>
          <p className="class">{year}</p>
          <span className="major">{major}</span>
        </div>
      </div>

      <p className="role">{role}</p>
      <p className="company">{company}</p>
      <p className="location">{location}</p>
      <p className="description">{description}</p>

      <div className="skills">
        {skills.map((skill, i) => (
          <span key={i} className="skill">{skill}</span>
        ))}
      </div>

      <div className="card-actions">
        <button className="connect-btn">
          <FaUserPlus className="user-icon" /> Connect
        </button>

        <button className="icon-btn" onClick={() => setShowChatPopup(true)}>
          <FaCommentDots />
        </button>

        <div className="tooltip-container">
          <button className="icon-btn">
            <MdEmail />
          </button>
          <span className="tooltip-text">Email: {email}</span>
        </div>
      </div>
    </div>
  );
}

export default AlumniCard;