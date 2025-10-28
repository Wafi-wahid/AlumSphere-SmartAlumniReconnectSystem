import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// ✅ Get all requests
router.get("/", async (req, res) => {
  try {
    console.log("📥 Fetching all requests...");
    // ✅ Sort by oldest first (createdAt: 1)
    const requests = await Request.find().sort({ createdAt: 1 });
    console.log(`✅ Found ${requests.length} requests`);
    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching requests:", error);
    res.status(500).json({ 
      message: "Error fetching requests", 
      error: error.message 
    });
  }
});

// ✅ Create a new request
router.post("/", async (req, res) => {
  try {
    console.log("📝 Creating new request:", req.body);
    const newRequest = new Request(req.body);
    await newRequest.save();
    console.log("✅ Request created successfully:", newRequest._id);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("❌ Error creating request:", error);
    res.status(400).json({ 
      message: "Error creating request", 
      error: error.message 
    });
  }
});

// ✅ Update status (accept / decline / completed)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    console.log(`📝 Updating request ${req.params.id} to status: ${status}`);
    
    const updateData = { status };

    // Generate meeting link when accepting
    if (status === "accepted") {
      const meetingLink = `https://meet.jit.si/mentorship-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      updateData.meetingLink = meetingLink;
      console.log(`🔗 Generated meeting link: ${meetingLink}`);
    }

    // Add completion timestamp
    if (status === "completed") {
      updateData.completedAt = new Date();
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
    res.status(500).json({ 
      message: "Failed to update status", 
      error: error.message 
    });
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
    res.status(500).json({ 
      message: "Error deleting request", 
      error: error.message 
    });
  }
});

export default router;