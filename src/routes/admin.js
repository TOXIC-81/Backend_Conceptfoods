import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import MenuItem from "../models/MenuItem.js";
import Content from "../models/Content.js";
import CheeseBoard from "../models/CheeseBoard.js";
import Order from "../models/Order.js";

const router = express.Router();

// Admin middleware - now supports both admin accounts and users with admin privileges
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if it's an admin token
    if (decoded.adminId) {
      const admin = await Admin.findById(decoded.adminId);
      if (!admin) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.admin = admin;
      req.isAdminAccount = true;
    } 
    // Check if it's a user token with admin privileges
    else if (decoded.userId) {
      const user = await User.findById(decoded.userId);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      req.admin = user;
      req.isAdminAccount = false;
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ 
      $or: [{ username }, { email: username }] 
    });
    
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get menu items by category (public endpoint)
router.get("/menu-items", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isAvailable: true } : { isAvailable: true };
    const items = await MenuItem.find(filter).sort({ sortOrder: 1, name: 1 });
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all menu items (admin only)
router.get("/menu-items-admin", adminAuth, async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create menu item
router.post("/menu-items", adminAuth, async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json({ message: "Menu item created successfully", item });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update menu item
router.put("/menu-items/:id", adminAuth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json({ message: "Menu item updated successfully", item });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete menu item
router.delete("/menu-items/:id", adminAuth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update website content
router.post("/update-content", adminAuth, async (req, res) => {
  try {
    const { type, index, content } = req.body;
    
    if (!type || index === undefined || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { type, index },
      { content, updatedBy: req.admin._id },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ 
      message: "Content updated successfully", 
      content: updatedContent 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get website content
router.get("/content", async (req, res) => {
  try {
    const content = await Content.find().sort({ type: 1, index: 1 });
    res.json({ content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get admin profile
router.get("/profile", adminAuth, async (req, res) => {
  try {
    res.json({ 
      admin: {
        id: req.admin._id,
        username: req.admin.username,
        email: req.admin.email,
        role: req.admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get cheese boards
router.get('/cheese-boards', async (req, res) => {
  try {
    const boards = await CheeseBoard.find();
    res.json({ boards });
  } catch (error) {
    console.error('Error fetching cheese boards:', error);
    res.status(500).json({ error: 'Failed to fetch cheese boards' });
  }
});

// Get specific cheese board by type
router.get('/cheese-boards/:type', async (req, res) => {
  try {
    const board = await CheeseBoard.findOne({ type: req.params.type });
    if (!board) {
      return res.status(404).json({ error: 'Cheese board type not found' });
    }
    res.json({ board });
  } catch (error) {
    console.error('Error fetching cheese board:', error);
    res.status(500).json({ error: 'Failed to fetch cheese board' });
  }
});

// Update cheese board
router.put('/cheese-boards/:id', adminAuth, async (req, res) => {
  try {
    const board = await CheeseBoard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!board) {
      return res.status(404).json({ error: 'Cheese board not found' });
    }
    res.json({ message: 'Cheese board updated successfully', board });
  } catch (error) {
    console.error('Error updating cheese board:', error);
    res.status(500).json({ error: 'Failed to update cheese board' });
  }
});

// Create order
router.post('/orders', async (req, res) => {
  try {
    const orderNumber = 'ORD' + Date.now();
    const order = new Order({ ...req.body, orderNumber });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (admin only)
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

export default router;