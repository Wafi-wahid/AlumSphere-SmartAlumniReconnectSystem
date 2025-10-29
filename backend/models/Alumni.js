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
  experience: Number, // ✅ New Field
  skills: [String],
  image: String,
  available: Boolean, // ✅ Add this too so you can use your existing filters
});
export default mongoose.model("Alumni", alumniSchema, "Alumni");


