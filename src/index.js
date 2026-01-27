import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import simpleAuthRoutes from "./routes/simple-auth.js";
import adminRoutes from "./routes/admin.js";
import cheeseBoardRoutes from "./routes/cheese-boards.js";
import imageRoutes from "./routes/images.js";
import { performanceMiddleware } from "./middleware/performance.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Performance middleware
app.use(performanceMiddleware.responseTime);
app.use(performanceMiddleware.memoryOptimization);
app.use(performanceMiddleware.rateLimit(200, 60000)); // 200 requests per minute

app.use(cors({
  origin: [
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "http://127.0.0.1:5502",
    "http://localhost:5502",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://cute-meerkat-a9db53.netlify.app",
    "https://silly-maamoul-a8a811.netlify.app",
    /\.netlify\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// Serve uploaded images with caching
app.use('/uploads', performanceMiddleware.cache(3600), express.static(path.join(__dirname, '../uploads')));

app.get("/", (req, res) => {
  res.send("API is running");
});

// Apply caching to menu items endpoint
app.use("/api/admin/menu-items", performanceMiddleware.cache(300)); // 5 minutes cache

app.use("/api/auth", authRoutes);
app.use("/api/simple", simpleAuthRoutes);
app.use("/api/admin", performanceMiddleware.dbOptimization, adminRoutes);
app.use("/api", cheeseBoardRoutes);
// Also mount cheeseBoard routes under /api/admin to remain compatible with frontend paths
app.use("/api/admin", cheeseBoardRoutes);
app.use("/api/images", imageRoutes);

// Error handling
app.use(performanceMiddleware.errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
