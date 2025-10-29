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
  available,
  onRequestMentorship 
}) {
  return (
    <div className="alumni-card">
      <div className="card-header">
        <div className="profile-pic-wrapper">
          <img src={image} alt={name} className="profile-pic" />
          {/* ✅ green active dot inside the image */}
          {available && <span className="online-dot"></span>}
        </div>

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
          <span key={i} className="skill">
            {skill}
          </span>
        ))}
      </div>

     <div className="card-actions">
  <button className="connect-btn" onClick={onRequestMentorship}>
    Request Mentorship
  </button>
  <button className="message-btn">
    Message
  </button>
</div>

    </div>
  );
}

export default AlumniCard;
