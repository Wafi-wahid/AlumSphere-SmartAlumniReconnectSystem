import express from "express";
import Alumni from "../models/Alumni.js";

const router = express.Router();

// GET /api/alumnis?q=react&available=true
router.get("/", async (req, res) => {
  try {
    const { q, available, name, batch, campus, graduationYear } = req.query;

    let filter = {};

    // keep existing filters if provided
    if (name) filter.name = new RegExp(name, "i");
    if (batch) filter.batch = batch;
    if (campus) filter.campus = campus;
    if (graduationYear) filter.graduationYear = graduationYear;

    // available filter (true/false)
    if (available !== undefined) {
      // accepts 'true' or 'false' strings
      if (available === "true") filter.available = true;
      else if (available === "false") filter.available = false;
    }

    // if `q` provided - search across name, role, company and skills
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { role: regex },
        { company: regex },
        { major: regex },
        { skills: regex }, // works because skills is array of strings
      ];
    }

    const alumni = await Alumni.find(filter).sort({ name: 1 }); // optional sort
    res.json(alumni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
