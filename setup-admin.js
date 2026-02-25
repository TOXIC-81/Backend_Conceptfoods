import mongoose from "mongoose";
import Admin from "./src/models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

async function setupAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Admin.deleteMany({ email: "admin@conceptfoods.in" });

    const admin = new Admin({
      username: "admin",
      email: "admin@conceptfoods.in",
      password: "admin123",
      role: "super-admin"
    });

    await admin.save();
    console.log("✓ Admin created: admin@conceptfoods.in / admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

setupAdmin();
