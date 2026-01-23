import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create user schema directly
    const userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      password: String,
      isEmailVerified: Boolean,
      isAdmin: Boolean
    }, { timestamps: true });

    const User = mongoose.model('User', userSchema);

    // Delete existing admin user
    await User.deleteOne({ email: "admin@conceptfoods.in" });

    // Hash password manually
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Create admin user
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@conceptfoods.in",
      phone: "9876543210",
      password: hashedPassword,
      isEmailVerified: true,
      isAdmin: true
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@conceptfoods.in");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createAdminUser();