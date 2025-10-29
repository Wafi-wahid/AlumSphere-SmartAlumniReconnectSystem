import React from "react";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  return (
    <>
      {/* ========================================
          🆕 TOP MENTORS LEADERBOARD (NEW SECTION)
      ======================================== */}
      <div className="top-mentors-section">
        <h2 className="top-mentors-title">Top Mentors</h2>

        <div className="leaderboard-container">
          <div className="leaderboard-header">
            <span className="leaderboard-icon">🏆</span>
            <span className="leaderboard-text">Leaderboard</span>
          </div>
          <p className="leaderboard-subtitle">
            Our most experienced and highest-rated mentors
          </p>

          <div className="mentors-list">
            {/* Mentor 1 */}
            <div className="mentor-item">
              <div className="mentor-rank rank-1">1</div>
              <div className="mentor-info">
                <h3 className="mentor-name">Ms. Ayesha Khan</h3>
                <p className="mentor-expertise">
                  UI/UX Design, Product Thinking
                </p>
              </div>
              <div className="mentor-rating">
                <div>
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">4.9</span>
                </div>
                <span className="sessions-count">52 sessions</span>
              </div>
            </div>

            {/* Mentor 2 */}
            <div className="mentor-item">
              <div className="mentor-rank rank-2">2</div>
              <div className="mentor-info">
                <h3 className="mentor-name">Dr. Fatima Noor</h3>
                <p className="mentor-expertise">
                  Marketing Strategy, Business Development
                </p>
              </div>
              <div className="mentor-rating">
                <div>
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">4.9</span>
                </div>
                <span className="sessions-count">48 sessions</span>
              </div>
            </div>

            {/* Mentor 3 */}
            <div className="mentor-item">
              <div className="mentor-rank rank-3">3</div>
              <div className="mentor-info">
                <h3 className="mentor-name">Dr. Sarah Malik</h3>
                <p className="mentor-expertise">
                  AI & ML, Career Guidance
                </p>
              </div>
              <div className="mentor-rating">
                <div>
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">4.8</span>
                </div>
                <span className="sessions-count">45 sessions</span>
              </div>
            </div>

            {/* Mentor 4 */}
            <div className="mentor-item">
              <div className="mentor-rank">4</div>
              <div className="mentor-info">
                <h3 className="mentor-name">Prof. Hassan Ali</h3>
                <p className="mentor-expertise">
                  Data Science, Research Methods
                </p>
              </div>
              <div className="mentor-rating">
                <div>
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">4.7</span>
                </div>
                <span className="sessions-count">41 sessions</span>
              </div>
            </div>

            {/* Mentor 5 */}
            <div className="mentor-item">
              <div className="mentor-rank">5</div>
              <div className="mentor-info">
                <h3 className="mentor-name">Engr. Ahmed Raza</h3>
                <p className="mentor-expertise">
                  Web Development, Cloud Computing
                </p>
              </div>
              <div className="mentor-rating">
                <div>
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">4.6</span>
                </div>
                <span className="sessions-count">38 sessions</span>
              </div>
            </div>

            {/* Mentor 6 */}
            <div className="mentor-item">
              <div className="mentor-rank">6</div>
              <div className="mentor-info">
                <h3 className="mentor-name">Mr. Usman Sheikh</h3>
                <p className="mentor-expertise">
                  Mobile App Development, Startup Guidance
                </p>
              </div>
              <div className="mentor-rating">
                <div>
                  <span className="rating-star">⭐</span>
                  <span className="rating-value">4.5</span>
                </div>
                <span className="sessions-count">35 sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 🆕 LEADERBOARD SECTION ENDS */}
    </>
  );
};

export default LeaderBoard;
