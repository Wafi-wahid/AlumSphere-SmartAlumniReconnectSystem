import axios from 'axios';

// SAHI URL → Backend ka
const API_URL = 'http://localhost:5000/api/leaderboard';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchLeaderboard = async () => {
  try {
    const response = await api.get('/');
    return response.data; // sirf .data return karo
  } catch (error) {
    console.error('Leaderboard API Error:', error);
    throw error;
  }
};