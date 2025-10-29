import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import AlumniCard from "./AlumniCard";
import RequestForm from "./RequestForm";
import "./AlumniList.css";
import "./RequestForm.css";
import RequestList from "./RequestList";
import axios from "axios";
import MessageModal from "./MessageModal";
import { sendMessage } from "../services/messageService"; // add this (adjust path if needed)

function AlumniList() {
  const [alumniData, setAlumniData] = useState([]); // ✅ dynamic data from backend
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [mentorNameForNotification, setMentorNameForNotification] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // NEW: active message user for global modal
  const [activeMessageUser, setActiveMessageUser] = useState(null);

  // ✅ FETCH ALUMNI DATA FROM BACKEND
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alumnis");
        setAlumniData(response.data);
      } catch (error) {
        console.error("❌ Error fetching alumni:", error);
      }
    };
    fetchAlumni();
  }, []);

  // ✅ FILTER ALUMNI BASED ON AVAILABILITY & SEARCH
  const alumniToDisplay = alumniData.filter((alumni) => {
    const matchesAvailability = showAvailable ? alumni.available : true;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      alumni.name.toLowerCase().includes(query) ||
      (alumni.major && alumni.major.toLowerCase().includes(query)) ||
      (alumni.role && alumni.role.toLowerCase().includes(query)) ||
      (alumni.company && alumni.company.toLowerCase().includes(query))||
       (alumni.skills &&
      alumni.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      ));

    return matchesAvailability && matchesSearch;
  });

  const handleRequestMentorship = (alumni) => {
    setSelectedAlumni(alumni);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedAlumni(null);
  };

  const handleSubmitSuccess = () => {
    setMentorNameForNotification(selectedAlumni?.name);
    setShowForm(false);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setSelectedAlumni(null);
      setMentorNameForNotification(null);
    }, 5000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setSelectedAlumni(null);
    setMentorNameForNotification(null);
  };

  // NEW: send message handler (used by MessageModal)
  const handleSendMessage = async (msg) => {
    if (!activeMessageUser) return;
    try {
      await sendMessage(activeMessageUser.name, msg);
      alert("Message sent to " + activeMessageUser.name);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message");
    } finally {
      setActiveMessageUser(null); // close modal after send
    }
  };

  return (
    <div className="alumni-list-container">
      {/* ✅ Header with Search + Filter */}
      <div className="find-mentor-header">
        <h2 className="find-mentor-heading">Find Your Mentor</h2>

        <div className="search-filter-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, skill,  role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="show-all-btn"
            onClick={() => setShowAvailable(!showAvailable)}
          >
            <FaFilter className="filter-icon" />
            {showAvailable ? "Show All" : "Available Only"}
          </button>
        </div>
      </div>

      <div className="alumni-grid">
        {alumniToDisplay.map((alum, index) => (
          <AlumniCard 
            key={index} 
            {...alum} 
            onRequestMentorship={() => handleRequestMentorship(alum)}
            onOpenMessageModal={(user) => setActiveMessageUser(user)} // <-- pass handler
          />
        ))}
      </div>

      <RequestList />

      {showForm && (
        <div className="form-modal-overlay">
          <div className="form-modal-content">
            <button className="close-modal-btn" onClick={handleCloseForm}>×</button>
            <RequestForm 
              mentorName={selectedAlumni?.name}
              onClose={handleCloseForm}
              onSubmitSuccess={handleSubmitSuccess}
            />
          </div>
        </div>
      )}

      {showNotification && (
        <div className="success-notification-right">
          <div className="success-content">
            <span className="success-icon">💬</span>
            <div className="success-text">
              <p className="success-title">Request Sent Successfully!</p>
              <p className="success-message">
                Your mentorship request has been sent to {mentorNameForNotification || selectedAlumni?.name}
              </p>
            </div>
            <button className="close-notification-btn" onClick={handleCloseNotification}>×</button>
          </div>
        </div>
      )}

      {/* NEW: Single global MessageModal rendered at root of this component */}
      {activeMessageUser && (
        <MessageModal
          recipient={activeMessageUser.name}
          role={activeMessageUser.role}
          image={activeMessageUser.image}
          onClose={() => setActiveMessageUser(null)}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );
}

export default AlumniList;
