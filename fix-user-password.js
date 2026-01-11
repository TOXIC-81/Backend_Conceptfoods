import mongoose from "mongoose";
import User from "./src/models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function fixUserPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Replace with your actual email
    const email = "admin@conceptfoods.in"; // CHANGE THIS
    const newPassword = "admin123"; // CHANGE THIS

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      process.exit(1);
    }

    // Hash the password properly
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update user with properly hashed password
    await User.updateOne(
      { email }, 
      { password: hashedPassword }
    );

    console.log("Password updated successfully for:", email);
    console.log("You can now login with this password:", newPassword);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixUserPassword();