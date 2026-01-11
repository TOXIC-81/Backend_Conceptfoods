import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Simple auth routes working" });
});

// Simple register without OTP (for testing)
router.post("/register-simple", async (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: "User already exists" });
    }

    console.log('Creating new user...');
    const user = new User({ firstName, lastName, email, phone, password });
    
    console.log('Saving user to database...');
    await user.save();
    console.log('User created successfully:', user._id);

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
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login (works for both users and admins)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, passwordLength: password?.length });

    // Check if it's admin first
    if (email === 'admin@conceptfoods.in') {
      const admin = await Admin.findOne({ email });
      if (admin && await admin.comparePassword(password)) {
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        return res.json({
          message: "Admin login successful",
          token,
          isAdmin: true,
          admin: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role
          }
        });
      }
    }

    // Regular user login
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    
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
    console.error('Login error:', error);
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