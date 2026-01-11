import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import emailService from "../services/emailService.js";

const router = express.Router();

// Send Registration OTP
router.post("/send-registration-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email, type: 'registration' });

    const otp = emailService.generateOTP();
    await OTP.create({ email, otp, type: 'registration' });
    await emailService.sendRegistrationOTP(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Verify Registration OTP and Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, otp } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp, type: 'registration' });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();

    // Delete the OTP after successful registration
    await OTP.deleteOne({ _id: otpRecord._id });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Send Password Reset OTP
router.post("/send-reset-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email, type: 'password-reset' });

    const otp = emailService.generateOTP();
    await OTP.create({ email, otp, type: 'password-reset' });
    await emailService.sendPasswordResetOTP(email, otp);

    res.json({ message: "Password reset OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Reset Password with OTP
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp, type: 'password-reset' });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    // Delete the OTP after successful password reset
    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get Profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;