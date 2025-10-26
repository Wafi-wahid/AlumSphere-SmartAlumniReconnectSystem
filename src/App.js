import React from "react";
import Navbar from "./components/Navbar";
import AlumniList from "./components/AlumniList";
import MentorshipHeader from "./components/MentorshipHeader"; // ✅ imported
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MentorshipHeader /> {/* ✅ contains hero + find mentor */}
      <div className="directory-wrapper">
        <AlumniList />
      </div>
    </div>
  );
}

export default App;
