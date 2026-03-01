import mongoose from "mongoose";
import dotenv from "dotenv";
import OTP from "./src/models/OTP.js";

dotenv.config();

async function testOTP() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const testEmail = "test@example.com";
    
    // Clean up any existing OTPs
    await OTP.deleteMany({ email: testEmail });
    
    // Create a test OTP
    const testOtp = "123456";
    await OTP.create({ 
      email: testEmail, 
      otp: testOtp, 
      type: 'registration' 
    });
    
    console.log(`✓ OTP created: ${testOtp} for ${testEmail}`);
    
    // Verify it can be found
    const found = await OTP.findOne({ 
      email: testEmail, 
      otp: testOtp, 
      type: 'registration' 
    });
    
    if (found) {
      console.log("✓ OTP found in database");
      console.log(`  Expires at: ${found.expiresAt}`);
    } else {
      console.log("✗ OTP not found");
    }
    
    // Clean up
    await OTP.deleteMany({ email: testEmail });
    console.log("✓ Test OTP cleaned up");
    
    await mongoose.disconnect();
    console.log("\nTest completed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

testOTP();
