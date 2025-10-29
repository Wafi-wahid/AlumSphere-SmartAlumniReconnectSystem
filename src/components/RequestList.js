import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestList.css";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  
  // ✅ Feedback modal states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [showRatingError, setShowRatingError] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests");
        
        // ✅ Sort: Oldest first (purane top pe, naye bottom)
        const sortedRequests = res.data.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        
        setRequests(sortedRequests);
        console.log("✅ Requests loaded:", sortedRequests.length);
        
        sortedRequests.forEach(req => {
          if (req.status === 'accepted') {
            console.log(`📋 Request ${req._id}:`, {
              status: req.status,
              meetingLink: req.meetingLink,
              hasMeetingLink: !!req.meetingLink
            });
          }
        });
      } catch (error) {
        console.error("❌ Error fetching requests:", error);
        console.error("Error details:", error.response?.data || error.message);
      }
    };
    fetchRequests();
  }, []);

  // ✅ Show notification helper
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // ✅ Handle Accept button click
  const handleAccept = async (id, mentorName) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/requests/${id}/status`, { 
        status: "accepted",
        meetingType: "jitsi"
      });
      
      console.log("✅ Request accepted:", res.data);
      
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? res.data : req))
      );
      
      showSuccessNotification(`Your mentorship request has been sent to ${mentorName}`);
    } catch (error) {
      console.error("❌ Error accepting request:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert("Failed to accept request. Check console for details.");
    }
  };

  // ✅ Handle Decline button click
  const handleDecline = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/requests/${id}/status`, { 
      status: "declined" 
    });
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? res.data : req))
    );
  };

  // ✅ Handle Join Session - Opens meeting link in new tab
  const handleJoinSession = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  // ✅ Handle End Session - Opens Feedback Modal
  const handleEndSession = (request) => {
    setActiveSession(request);
    setShowFeedbackModal(true);
    // Reset feedback form
    setRating(0);
    setComments("");
    setShowRatingError(false);
  };

  // ✅ Handle Skip Feedback
  const handleSkipFeedback = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/requests/${activeSession._id}/status`, 
        { status: "completed" }
      );
      
      setRequests((prev) =>
        prev.map((req) => (req._id === activeSession._id ? res.data : req))
      );
      
      setShowFeedbackModal(false);
      setActiveSession(null);
    } catch (error) {
      console.error("Error completing session:", error);
    }
  };

  // ✅ Handle Submit Feedback
  const handleSubmitFeedback = async () => {
    // Validation: Check if rating is selected
    if (rating === 0) {
      setShowRatingError(true);
      setTimeout(() => setShowRatingError(false), 3000);
      return;
    }

    try {
      // Update request status to completed
      const res = await axios.put(
        `http://localhost:5000/api/requests/${activeSession._id}/status`, 
        { 
          status: "completed",
          feedback: {
            rating: rating,
            comments: comments
          }
        }
      );
      
      setRequests((prev) =>
        prev.map((req) => (req._id === activeSession._id ? res.data : req))
      );
      
      setShowFeedbackModal(false);
      setActiveSession(null);
      
      // ✅ Show success notification
      showSuccessNotification("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // ✅ Handle Close (X) button on feedback modal
  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  // ✅ Format date/time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="requests-section">
      <h2>Your Requests</h2>
      <div className="requests-grid">
        {requests.map((req) => (
          <div key={req._id} className="request-card">
            
            {/* ✅ Top row: Name + Status */}
            <div className="request-card-header">
              <h3>{req.mentorName}</h3>
              <span className={`status-badge ${req.status}`}>
                {req.status}
              </span>
            </div>

            {/* ✅ Details */}
            <p className="topic-name">{req.topicName}</p>
            <p className="request-date">
              <span className="calendar-icon">📅</span> 
              {formatDateTime(req.date)}
            </p>
            <p className="request-type">
              <strong>Type:</strong> {req.type}
            </p>

            {/* ✅ PENDING STATE - Show Accept/Decline buttons */}
            {req.status === "pending" && (
              <div className="btn-row">
                <button
                  className="btn accept"
                  onClick={() => handleAccept(req._id, req.mentorName)}
                >
                
                  Accept
                </button>
                <button
                  className="btn decline"
                  onClick={() => handleDecline(req._id)}
                >
                  Decline
                </button>
              </div>
            )}

            {/* ✅ ACCEPTED STATE - Show Join Session & End Session buttons */}
            {req.status === "accepted" && (
              <div className="accepted-section">
                {req.meetingLink ? (
                  <div className="meeting-link-info">
                    <strong>Meeting Link:</strong>{" "}
                    <a 
                      href={req.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="meeting-link"
                    >
                      {req.meetingLink}
                    </a>
                  </div>
                ) : (
                  <p className="no-link-warning">⚠️ Meeting link not generated yet</p>
                )}
                
                <div className="session-buttons">
                  <button 
                    className="btn join-session"
                    onClick={() => handleJoinSession(req.meetingLink)}
                    disabled={!req.meetingLink}
                  >
                    {req.meetingLink ? 'Join Session' : 'Link Pending...'}
                  </button>
                  
                  <button 
                    className="btn end-session-card"
                    onClick={() => handleEndSession(req)}
                    disabled={!req.meetingLink}
                  >
                    End Session
                  </button>
                </div>
              </div>
            )}

            {/* ✅ COMPLETED STATE - Show completion status */}
            {req.status === "completed" && (
              <button className="btn session-completed" disabled>
                 Session Completed
              </button>
            )}

            {/* ✅ DECLINED STATE */}
            {req.status === "declined" && (
              <p className="declined-text">Request declined</p>
            )}
          </div>
        ))}
      </div>


      {/* ✅ SUCCESS NOTIFICATION */}
      {showNotification && (
        <div className="success-notification-popup">
          <div className="notification-content">
            <div className="notification-text">
             
              <p className="notification-message">{notificationMessage}</p>
            </div>
            <button 
              className="close-notification-btn"
              onClick={() => setShowNotification(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ✅ RATING ERROR NOTIFICATION */}
      {showRatingError && (
        <div className="success-notification-popup">
          <div className="notification-content error">
            <span className="notification-icon">⚠️</span>
            <div className="notification-text">
              <p className="notification-title">Rating Required</p>
              <p className="notification-message">Please rate your experience</p>
            </div>
            <button 
              className="close-notification-btn"
              onClick={() => setShowRatingError(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ✅ FEEDBACK MODAL */}
      {showFeedbackModal && activeSession && (
        <div className="video-modal-overlay">
          <div className="feedback-modal-container">
            <div className="feedback-modal-header">
              <div>
                <h2>Session Feedback</h2>
                <p className="feedback-subtitle">How was your mentorship session?</p>
              </div>
              <button 
                className="close-feedback-modal"
                onClick={handleCloseFeedbackModal}
              >
                ×
              </button>
            </div>

            <div className="feedback-modal-body">
              <div className="rating-section">
                <label className="rating-label">Rate Your Experience *</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
                 
                 
        {/* 🆕 QUICK FEEDBACK TEMPLATES */}
        <div className="quick-feedback-templates">
          <label className="template-label">Quick Feedback Templates</label>
          <div className="templates-scroll">
            {[
              "Great mentorship session 🌟",
              "Very helpful & insightful 💡",
              "Would love another session 🔁",
              "Clear and motivating guidance 💬",
              "Learned a lot today 📘",
              "Excellent communication 👏",
              "Practical and real-world advice 🔍"
            ].map((template, index) => (
              <button
                key={index}
                className="feedback-chip"
                onClick={() => setComments(template)}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

              <div className="comments-section">
                <label className="comments-label">Comments (Optional)</label>
                <textarea
                  className="feedback-textarea"
                  placeholder="Share your experience..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows="4"
                />
              </div>
            </div>

            <div className="feedback-modal-footer">
              <button 
                className="btn skip-feedback"
                onClick={handleSkipFeedback}
              >
                Skip
              </button>
              <button 
                className="btn submit-feedback"
                onClick={handleSubmitFeedback}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsList;