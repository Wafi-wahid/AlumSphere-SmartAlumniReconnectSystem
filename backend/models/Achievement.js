import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String },
});

export default mongoose.model('Achievement', achievementSchema);