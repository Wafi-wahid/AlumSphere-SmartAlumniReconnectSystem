import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: String,
  batch: String,
  campus: String,
  graduationYear: Number,
  company: String,
  role: String,
  major: String,
  location: String,
  skills: [String],
  image: String,
});

export default mongoose.model("Alumni", alumniSchema);
