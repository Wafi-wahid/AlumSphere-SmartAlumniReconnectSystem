import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import requestRouter from "./routes/requestsRoutes.js"; // ✅ Your route file
import alumniRouter from "./routes/alumniRoutes.js"; // only if exists

dotenv.config();

const app = express();

// ✅ CORS Configuration - VERY IMPORTANT!
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // React frontend URLs
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Test route - check if backend is working
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "✅ Backend is working!", 
    timestamp: new Date().toISOString() 
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/requests", requestRouter);
app.use("/api/alumnis", alumniRouter); // only if file exists

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Mentorship Platform Server is running...");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ 
    message: "Server Error", 
    error: err.message 
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.path 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/requests`);
  console.log(`   - http://localhost:${PORT}/api/alumnis`);
});