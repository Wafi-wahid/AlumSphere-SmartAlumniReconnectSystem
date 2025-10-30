// backend/routes/leaderboard.js
import express from 'express';
import Mentor from '../models/Mentor.js';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// YE ROUTE HAI — /api/leaderboard
router.get('/', async (req, res) => {
  try {
    // SAB MENTORS LAO + BATCH BHI INCLUDE HAI (kyunki model mein hai)
    const mentors = await Mentor.find().sort({ sessions: -1 });
    const achievements = await Achievement.find();

    // YE JSON BHEJO FRONTEND PE
    res.json({
      topMentors: mentors,
      achievements: achievements
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;