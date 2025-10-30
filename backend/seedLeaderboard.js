// backend/seedLeaderboard.js
import mongoose from 'mongoose';
import Mentor from './models/Mentor.js';
import Achievement from './models/Achievement.js';
import dotenv from 'dotenv';

dotenv.config();

const data = {
  achievements: [
    { title: 'Mentorship Sessions', value: '500+', icon: 'fa-users' },
    { title: 'Success Rate', value: '96%', icon: 'fa-chart-line' },
    { title: 'Alumni Connected', value: '1000+', icon: 'fa-user-graduate' },
    { title: 'Combined Impact', value: '$2M+', icon: 'fa-dollar-sign' },
  ],
  mentors: [
    // SPRING 2021
    { name: 'Ms. Lara Ahmed', title: 'Software Engineer', company: 'Facebook', rating: 4.5, sessions: 42, batch: 'spring-2021' },
    { name: 'Prof. John Doe', title: 'Data Science Professor', company: 'MIT', rating: 4.8, sessions: 51, batch: 'spring-2021' },

    // FALL 2021
    { name: 'Dr. Sarah Mills', title: 'Chief AI Scientist', company: 'Google', rating: 4.9, sessions: 48, batch: 'fall-2021' },
    { name: 'Prof. Ali Hassan', title: 'ML Researcher', company: 'Stanford', rating: 4.9, sessions: 52, batch: 'fall-2021' },

    // FALL 2022 (YE ADD KIYA)
    { name: 'Engr. Nida Khan', title: 'Frontend Lead', company: 'Airbnb', rating: 4.7, sessions: 47, batch: 'fall-2022' },
    { name: 'Mr. Usman Ali', title: 'Cloud Architect', company: 'AWS', rating: 4.8, sessions: 49, batch: 'fall-2022' },

    // SPRING 2022
    { name: 'Mr. Ayesha Khan', title: 'VP Engineering', company: 'Meta', rating: 4.8, sessions: 49, batch: 'spring-2022' },
    { name: 'Ms. Zainab Ahmed', title: 'Product Lead', company: 'Microsoft', rating: 4.7, sessions: 44, batch: 'spring-2022' },

    // FALL 2023
    { name: 'Engr. Ahmed Raza', title: 'CTO', company: 'StartupX', rating: 4.7, sessions: 46, batch: 'fall-2023' },
    { name: 'Engr. Omar Farooq', title: 'DevOps Lead', company: 'Netflix', rating: 4.8, sessions: 45, batch: 'fall-2023' },

    // SPRING 2023
    { name: 'Dr. Fatima Noor', title: 'Data Lead', company: 'Amazon', rating: 4.6, sessions: 47, batch: 'spring-2023' },
    { name: 'Dr. Sana Malik', title: 'AI Ethics Expert', company: 'OpenAI', rating: 4.9, sessions: 50, batch: 'spring-2023' },

    // FALL 2024
    { name: 'Engr. Sara Khan', title: 'Full Stack Developer', company: 'Uber', rating: 4.7, sessions: 43, batch: 'fall-2024' },

    // SPRING 2024
    { name: 'Dr. Michael Brown', title: 'AI Researcher', company: 'DeepMind', rating: 4.9, sessions: 55, batch: 'spring-2024' },
  ],
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Mentor.deleteMany({});
    await Achievement.deleteMany({});
    await Mentor.insertMany(data.mentors);
    await Achievement.insertMany(data.achievements);
    console.log('Leaderboard seeded with ALL BATCHES! (14 mentors)');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();