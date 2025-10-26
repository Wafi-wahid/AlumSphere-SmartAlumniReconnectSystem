import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// ✅ FREE Meeting Link Generators (No API Key Required!)

// Option 1: Jitsi Meet (100% Free, Open Source)
const generateJitsiLink = () => {
  const roomName = `mentorship-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  return `https://meet.jit.si/${roomName}`;
};

// Option 2: Whereby (Free for up to 4 participants)
const generateWherebyLink = () => {
  const roomName = `mentorship-${Math.random().toString(36).substr(2, 9)}`;
  return `https://whereby.com/${roomName}`;
};

// Option 3: Google Meet Style Link (Free, no API)
const generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const part1 = Array.from({length: 3}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part3 = Array.from({length: 3}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.google.com/${part1}-${part2}-${part3}`;
};

// ✅ Main function to generate meeting link
const generateMeetingLink = (type = 'jitsi') => {
  switch(type) {
    case 'jitsi':
      return generateJitsiLink(); // Recommended: 100% free, works perfectly
    case 'whereby':
      return generateWherebyLink();
    case 'google':
      return generateMeetLink();
    default:
      return generateJitsiLink();
  }
};

// ✅ Get all requests
router.get("/", async (req, res) => {
  try {
    console.log("📥 Fetching all requests...");
    const requests = await Request.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${requests.length} requests`);
    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching requests:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Create a new request
router.post("/", async (req, res) => {
  try {
    console.log("📝 Creating new request:", req.body);
    const newRequest = new Request(req.body);
    await newRequest.save();
    console.log("✅ Request created:", newRequest._id);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("❌ Error creating request:", error);
    res.status(400).json({ message: error.message });
  }
});

// ✅ Update status (accept / decline / completed)
router.put("/:id/status", async (req, res) => {
  try {
    const { status, meetingLink, meetingType = 'jitsi' } = req.body;
    console.log(`📝 Updating request ${req.params.id} to status: ${status}`);
    
    const updateData = { status };

    // ✅ If accepting, generate meeting link
    if (status === "accepted") {
      const generatedLink = generateMeetingLink(meetingType);
      updateData.meetingLink = meetingLink || generatedLink;
      console.log(`🔗 Generated meeting link: ${updateData.meetingLink}`);
    }

    // ✅ If completing session, add timestamp
    if (status === "completed") {
      updateData.completedAt = new Date();
      console.log(`✅ Session completed at: ${updateData.completedAt}`);
    }

    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log(`✅ Request updated successfully`);
    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
});

// ✅ Delete a request (optional)
router.delete("/:id", async (req, res) => {
  try {
    console.log(`🗑️ Deleting request: ${req.params.id}`);
    const deleted = await Request.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }
    
    console.log(`✅ Request deleted successfully`);
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting request:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;