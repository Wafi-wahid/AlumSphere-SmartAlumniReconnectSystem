import React from "react";
import { Link } from "react-router-dom"; // YE ADD KIYA
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">AlumSphere</div>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Directory</Link></li>
          <li><Link to="/events" className="nav-link">Events</Link></li>
          <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
          <li><Link to="/mentorship" className="nav-link">Mentorship</Link></li>
          <li><Link to="/success-stories" className="nav-link">Success Stories</Link></li> {/* YE NAYA */}
          <li><Link to="/give-back" className="nav-link">Give Back</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="sign-in">Sign In</button>
        <button className="join-btn">Join Network</button>
      </div>
    </nav>
  );
}

export default Navbar;