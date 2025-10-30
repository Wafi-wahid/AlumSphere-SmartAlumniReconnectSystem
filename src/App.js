import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AlumniList from "./components/AlumniList";
import MentorshipHeader from "./components/MentorshipHeader";
import LeaderBoard from "./components/LeaderBoard"; // YE NAYA IMPORT
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* Existing Mentorship Page */}
          <Route
            path="/"
            element={
              <>
                <MentorshipHeader />
                <div className="directory-wrapper">
                  <AlumniList />
                </div>
              </>
            }
          />

          {/* NEW Success Stories Page */}
          <Route path="/success-stories" element={<LeaderBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;