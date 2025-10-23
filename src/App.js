import React from "react";
import Navbar from "./components/Navbar";
import AlumniList from "./components/AlumniList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="mentorship-hero">
        <div className="hero-content">
          <h1 className="hero-title">Mentorship Program</h1>
          <p className="hero-subtitle">
            Connect with experienced alumni, grow your skills, and accelerate your career journey
          </p>
        </div>
      </div>
      <div className="directory-wrapper">
        {/* Added Find Your Mentor Section */}
        <div className="find-mentor-section">
          <h2 className="find-mentor-heading">Find Your Mentor</h2>
        </div>
        <AlumniList />
      </div>
    </div>
  );
}

export default App;