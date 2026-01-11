import mongoose from "mongoose";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete existing test user
    await User.deleteOne({ email: "test@test.com" });

    // Create new test user
    const testUser = new User({
      firstName: "Test",
      lastName: "User", 
      email: "test@test.com",
      phone: "1234567890",
      password: "test123"
    });

    await testUser.save();
    console.log("Test user created successfully!");
    console.log("Email: test@test.com");
    console.log("Password: test123");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createTestUser();