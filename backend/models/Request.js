import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  mentorName: { type: String, required: true },
  topicName: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  keyPoints: { type: String },
});

export default mongoose.model("Request", requestSchema);
