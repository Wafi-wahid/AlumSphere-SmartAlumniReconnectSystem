import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  mentorName: { 
    type: String, 
    required: true 
  },
  topicName: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['Individual', 'Group']
  },
  date: { 
    type: Date, 
    required: true 
  },
  keyPoints: { 
    type: String,
    default: ''
  },
  status: { 
    type: String, 
    default: "pending",
    enum: ['pending', 'accepted', 'declined', 'completed']
  },
  meetingLink: { 
    type: String,
    default: null
  }
}, { 
  timestamps: true 
});

const Request = mongoose.model("Request", requestSchema);

export default Request;