// backend/controllers/leaderboardController.js
import Mentor from '../models/Mentor.js';
import Achievement from '../models/Achievement.js';

export const getLeaderboard = async (req, res) => {
  try {
    const topMentors = await Mentor.find().sort({ sessions: -1 }).limit(10);
    const achievements = await Achievement.find();
    res.json({ topMentors, achievements });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};