import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">🎓 AlumSphere</div>
        <ul className="nav-links">
          <li>Directory</li>
          <li>Events</li>
          <li>Jobs</li>
          <li>Mentorship</li>
          <li>Give Back</li>
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
