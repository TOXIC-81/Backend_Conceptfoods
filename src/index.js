import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import simpleAuthRoutes from "./routes/simple-auth.js";
import adminRoutes from "./routes/admin.js";
import cheeseBoardRoutes from "./routes/cheese-boards.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "http://127.0.0.1:3000",
    "http://localhost:3000"
  ],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/simple", simpleAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", cheeseBoardRoutes);
// Also mount cheeseBoard routes under /api/admin to remain compatible with frontend paths
app.use("/api/admin", cheeseBoardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
