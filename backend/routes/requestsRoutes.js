import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new request
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Update status (accept / decline)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updateData = { status };

    if (status === "accepted") {
      updateData.meetingLink = `https://meet.example.com/session-${Date.now()}`;
    }

    const updated = await Request.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;
