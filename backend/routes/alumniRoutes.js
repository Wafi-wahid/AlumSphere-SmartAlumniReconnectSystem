import express from "express";
import Alumni from "../models/Alumni.js";

const router = express.Router();

// GET alumni with filters
router.get("/", async (req, res) => {
  try {
    const { name, batch, campus, graduationYear } = req.query;

    let filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (batch) filter.batch = batch;
    if (campus) filter.campus = campus;
    if (graduationYear) filter.graduationYear = graduationYear;

    const alumni = await Alumni.find(filter);
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
