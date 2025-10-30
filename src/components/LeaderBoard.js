// src/components/LeaderBoard.js
import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../services/leaderboardService';
import SuccessHeader from './SuccessHeader'; // YE ADD KARO
import TopMentors from './leaderboard/TopMentors';
import CareerJourneys from './leaderboard/CareerJourneys';
import AchievementStats from './leaderboard/AchievementStats';
import './LeaderBoard.css';

const LeaderBoard = () => {
  const [data, setData] = useState({ topMentors: [], achievements: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetchLeaderboard();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
        setData({ topMentors: [], achievements: [] });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

// src/components/LeaderBoard.js
return (
  <div className="leaderboard-page-wrapper">

    {/* FULL WIDTH HEADER */}
    <SuccessHeader />

    {/* CONTENT WITH PADDING */}
    <div className="leaderboard-content-container">
      <section className="top-mentors-section">
        <TopMentors mentors={data.topMentors} />
      </section>

      <section className="career-journeys-section">
        <CareerJourneys />
      </section>

      <section className="achievements-section">
        <h2 className="section-title">Achievement Highlights</h2>
        <AchievementStats achievements={data.achievements} />
      </section>
    </div>

  </div>
);
};

export default LeaderBoard;