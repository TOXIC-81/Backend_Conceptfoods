import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create admin schema directly
    const adminSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String
    }, { timestamps: true });

    const Admin = mongoose.model('Admin', adminSchema);

    // Delete existing admin
    await Admin.deleteMany({});

    // Hash password manually
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Create admin user
    const admin = new Admin({
      username: "admin",
      email: "admin@conceptfoods.in",
      password: hashedPassword,
      role: "super-admin"
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@conceptfoods.in");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createAdmin();