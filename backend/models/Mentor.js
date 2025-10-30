import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  rating: { type: Number, default: 5 },
  sessions: { type: Number, default: 0 },
  batch: { type: String, required: true }, // YE ADD KIYA
  photo: { type: String },
  
});

export default mongoose.model('Mentor', mentorSchema);