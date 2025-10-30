// src/components/leaderboard/CareerJourneys.js
import React from 'react';
import './CareerJourneys.css';

const journeys = [
  {
    initials: 'ZH',
    name: 'Zain Hassan',
    batch: 'CS 2018',
    role: 'Senior ML Engineer @ Microsoft',
    story: 'From campus recruit to leading AI ethics team.',
    color: '#2a9d8f'
  },
  {
    initials: 'MA',
    name: 'Mariam Awad',
    batch: 'EE 2019',
    role: 'Product Lead @ Stripe',
    story: 'Started as intern, now owns payment gateway.',
    color: '#e9c46a'
  },
  {
    initials: 'AR',
    name: 'Ali Raza',
    batch: 'ME 2017',
    role: 'Founder @ EcoTech',
    story: 'Built sustainable energy startup worth $5M.',
    color: '#e76f51'
  },
];

const CareerJourneys = () => {
  return (
    <div className="career-journeys">
      <h2 className="section-title">Inspiring Career Journeys</h2>
      <div className="journeys-grid">
        {journeys.map((j, i) => (
          <div key={i} className="journey-card">
            <div className="initials" style={{ backgroundColor: j.color }}>
              {j.initials}
            </div>
            <div className="journey-content">
              <h4>{j.name} <span>({j.batch})</span></h4>
              <p className="role">{j.role}</p>
              <p className="story">{j.story}</p>
              <button className="read-more">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerJourneys;