// src/components/leaderboard/TopMentors.js
import React, { useState } from 'react';
import BatchFilter from './BatchFilter';
import './TopMentors.css';

// STAR RATING
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<i key={i} className="fas fa-star filled"></i>);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<i key={i} className="fas fa-star-half-alt filled"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }
  return <div className="star-rating">{stars}</div>;
};

// TAG COMPONENT
const MentorTag = ({ label, icon, color }) => {
  return (
    <span className={`mentor-tag ${color}`}>
      <i className={`fas ${icon}`}></i> {label}
    </span>
  );
};

const TopMentors = ({ mentors }) => {
  const [selectedBatch, setSelectedBatch] = useState('all');

  // YE CHANGE KIYA — REAL BATCH FILTER
  const filteredMentors = mentors.filter(mentor => {
    if (selectedBatch === 'all') return true;
    return mentor.batch === selectedBatch;
  });

  // 1 TAG PER MENTOR
  const getSingleTag = (index) => {
    const tags = [
      { label: 'Top Mentor 2024', icon: 'fa-trophy', color: 'gold' },
      { label: 'Rising Star', icon: 'fa-star', color: 'purple' },
      { label: 'Community Champion', icon: 'fa-users', color: 'blue' },
      { label: 'Innovation Leader', icon: 'fa-lightbulb', color: 'green' },
    ];
    return tags[index % tags.length];
  };

  if (!mentors || mentors.length === 0) {
    return <p className="no-data">No mentors found.</p>;
  }

  return (
    <div className="top-mentors-section">

      {/* HEADER WITH FILTER */}
      <div className="header-with-filter">
        <h2 className="wall-of-fame-title">Wall Of Fame</h2>
        <BatchFilter onFilter={setSelectedBatch} />
      </div>

      {/* MENTORS LIST */}
      <div className="mentors-list">
        {filteredMentors.map((mentor, index) => {
          const tag = getSingleTag(index);
          return (
            <div key={mentor._id} className={`mentor-item ${index === 0 ? 'rank-1-card' : ''}`}>
              <div className="mentor-left">

                {/* RANK ICON */}
                <div className="rank-icon-container">
                  {index === 0 && <div className="rank-icon crown"><i className="fas fa-crown"></i></div>}
                  {index === 1 && <div className="rank-icon trophy"><i className="fas fa-trophy"></i></div>}
                  {index === 2 && <div className="rank-icon medal"><i className="fas fa-medal"></i></div>}
                  {index >= 3 && <div className="rank-number">#{index + 1}</div>}
                </div>

                {/* AVATAR */}
                <div className="avatar-wrapper">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=random&size=128&bold=true&color=fff`}
                    alt={mentor.name}
                    className="mentor-avatar"
                  />
                </div>

                {/* NAME + TAG + TITLE */}
                <div className="mentor-info">
                  <div className="name-tag-row">
                    <h4 className="mentor-name">{mentor.name}</h4>
                    <MentorTag label={tag.label} icon={tag.icon} color={tag.color} />
                  </div>
                  <p className="mentor-title">{mentor.title}</p>
                  <div className="rating-row">
                    <StarRating rating={mentor.rating} />
                    <span className="rating-value">{mentor.rating}</span>
                    <span className="sessions-count">({mentor.sessions} sessions)</span>
                  </div>
                </div>
              </div>

              {/* SCORE */}
              <div className="mentor-score">
                {mentor.sessions}
                <span className="score-label">score</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopMentors;