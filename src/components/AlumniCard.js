import React from "react";
import "./AlumniCard.css";

function AlumniCard({
  name,
  class: year,
  major,
  role,
  company,
  location,
  description,
  skills,
  image,
  available, // added available prop
  onRequestMentorship 
}) {
  return (
    <div className="alumni-card">
      <div className="card-header">
        <img src={image} alt={name} className="profile-pic" />
        <div className="header-text">
          <h3>
            {name} {available && <span className="available-tag-inline">Available</span>}
          </h3>
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
          <span key={i} className="skill">
            {skill}
          </span>
        ))}
      </div>

      <div className="card-actions">
        <button className="connect-btn" onClick={onRequestMentorship}>
          Request Mentorship
        </button>
      </div>
    </div>
  );
}

export default AlumniCard;
