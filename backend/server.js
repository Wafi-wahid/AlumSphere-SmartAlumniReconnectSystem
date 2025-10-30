import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import requestRouter from "./routes/requestsRoutes.js";
import alumniRouter from "./routes/alumniRoutes.js";
import leaderboardRouter from "./routes/leaderboardRoutes.js"; // YE IMPORT SAHI JAGA

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/requests", requestRouter);
app.use("/api/alumnis", alumniRouter);
app.use("/api/leaderboard", leaderboardRouter); // YE EK HI BAAR

// Test route
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Backend is working!", 
    timestamp: new Date().toISOString() 
  });
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Mentorship Platform Server is running...");
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/requests`);
  console.log(`   - http://localhost:${PORT}/api/alumnis`);
  console.log(`   - http://localhost:${PORT}/api/leaderboard`); // YE DIKHEGA
});