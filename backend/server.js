import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import requestRouter from "./routes/requestsRoutes.js"; // ✅ exact file name
import alumniRouter from "./routes/alumniRoutes.js"; // only if exists

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/requests", requestRouter);
app.use("/api/alumnis", alumniRouter); // only if file exists

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
