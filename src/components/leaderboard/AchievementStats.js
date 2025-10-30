// src/components/leaderboard/AchievementStats.js
import React from 'react';
import './AchievementStats.css';

const AchievementStats = ({ achievements }) => {
  return (
    <div className="achievement-stats">
      {achievements.map((a, i) => (
        <div key={i} className="stat-card">
          {a.icon && <i className={`stat-icon ${a.icon}`}></i>}
          <h3>{a.value}</h3>
          <p>{a.title}</p>
        </div>
      ))}
    </div>
  );
};

export default AchievementStats;