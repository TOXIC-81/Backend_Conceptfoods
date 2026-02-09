import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";
import Content from "../models/Content.js";
import CheeseBoard from "../models/CheeseBoard.js";
import Order from "../models/Order.js";
import Image from "../models/Image.js";
import MenuLimit from "../models/MenuLimit.js";
import SubcategoryLimit from "../models/SubcategoryLimit.js";

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

// Get menu items by category (public endpoint) - Optimized version
router.get("/menu-items", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isAvailable: true } : { isAvailable: true };
    
    // Use lean queries and projection for better performance
    const items = await MenuItem.find(filter)
      .select('name category subcategory price description isVegetarian sortOrder')
      .lean()
      .sort({ sortOrder: 1, name: 1 })
      .limit(150);
      
    // Set cache headers for client-side caching
    res.set({
      'Cache-Control': 'public, max-age=600',
      'ETag': `"${Date.now()}"`,
      'Last-Modified': new Date().toUTCString()
    });
      
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all menu items (admin only) - Optimized version
router.get("/menu-items-admin", adminAuth, async (req, res) => {
  try {
    const { category } = req.query;
    console.log('Fetching admin menu items for category:', category);
    
    const filter = category ? { category } : {};
    
    // Use lean queries and projection for better performance
    const items = await MenuItem.find(filter)
      .select('name category subcategory price description isVegetarian isAvailable sortOrder createdAt')
      .lean()
      .sort({ sortOrder: 1, name: 1 })
      .limit(200);
      
    console.log(`Found ${items.length} items for category: ${category}`);
      
    // Set cache headers for client-side caching
    res.set({
      'Cache-Control': 'public, max-age=300',
      'ETag': `"${Date.now()}"`,
      'Last-Modified': new Date().toUTCString()
    });
      
    res.json({ items });
  } catch (error) {
    console.error('Error fetching admin menu items:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create menu item
router.post("/menu-items", adminAuth, async (req, res) => {
  try {
    console.log('Creating menu item with data:', req.body);
    
    // Validate required fields
    if (!req.body.name || !req.body.category || !req.body.subcategory) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        error: "Name, category, and subcategory are required" 
      });
    }
    
    const item = new MenuItem(req.body);
    const savedItem = await item.save();
    
    console.log('Menu item created successfully:', savedItem._id);
    res.status(201).json({ 
      message: "Menu item created successfully", 
      item: savedItem 
    });
  } catch (error) {
    console.error("Error creating menu item:", error);
    
    // Provide more specific error messages
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        error: validationErrors.join(', ') 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Duplicate item", 
        error: "An item with this name already exists" 
      });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      error: error.message || "Unknown error occurred" 
    });
  }
});

// Update menu item
router.put("/menu-items/:id", adminAuth, async (req, res) => {
  try {
    console.log('Updating menu item:', req.params.id, 'with data:', req.body);
    
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    console.log('Menu item updated successfully:', item._id);
    res.json({ 
      message: "Menu item updated successfully", 
      item: item 
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    
    // Provide more specific error messages
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed", 
        error: validationErrors.join(', ') 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: "Invalid item ID", 
        error: "The provided item ID is not valid" 
      });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      error: error.message || "Unknown error occurred" 
    });
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
    const content = await Content.find()
      .lean()
      .sort({ type: 1, index: 1 })
      .limit(50); // Reasonable limit for content
      
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
    const boards = await CheeseBoard.find().lean().limit(20);
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

// Create cheese board
router.post('/cheese-boards', adminAuth, async (req, res) => {
  try {
    const board = new CheeseBoard(req.body);
    await board.save();
    res.status(201).json({ message: 'Cheese board created successfully', board });
  } catch (error) {
    console.error('Error creating cheese board:', error);
    res.status(500).json({ error: 'Failed to create cheese board' });
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

// Add item to cheese board category
router.post('/cheese-boards/:boardId/items', adminAuth, async (req, res) => {
  try {
    const { boardId } = req.params;
    const { categoryName, itemName, isVegetarian } = req.body;
    
    const board = await CheeseBoard.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Cheese board not found' });
    }
    
    // Find or create category
    let category = board.categories.find(cat => cat.name === categoryName);
    if (!category) {
      category = { name: categoryName, items: [] };
      board.categories.push(category);
    }
    
    // Add item to category
    const categoryIndex = board.categories.findIndex(cat => cat.name === categoryName);
    board.categories[categoryIndex].items.push({ name: itemName, isVegetarian });
    
    await board.save();
    res.json({ message: 'Item added successfully', board });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Delete item from cheese board category
router.delete('/cheese-boards/:boardId/items/:itemName', adminAuth, async (req, res) => {
  try {
    const { boardId, itemName } = req.params;
    const { categoryName } = req.query;
    
    const board = await CheeseBoard.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Cheese board not found' });
    }
    
    const category = board.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.items = category.items.filter(item => item.name !== itemName);
      await board.save();
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Initialize default cheese boards
router.post('/cheese-boards/initialize', adminAuth, async (req, res) => {
  try {
    const count = await CheeseBoard.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Cheese boards already exist', count });
    }
    
    const defaultBoards = [
      {
        name: 'Classic Cheese Board',
        type: 'classic',
        price: 2100,
        description: '800gms • Serves 2-3',
        categories: [
          { name: 'Cheese Selection', items: [] },
          { name: 'Breads & Crisps', items: [] },
          { name: 'Dips', items: [] },
          { name: 'Fresh Fruits', items: [] },
          { name: 'Dry Fruits', items: [] },
          { name: 'Add Ons', items: [] }
        ]
      },
      {
        name: 'Indian Cheese Board',
        type: 'indian',
        price: 2500,
        description: '1000gms • Serves 4-6',
        categories: [
          { name: 'Cheese Selection', items: [] },
          { name: 'Breads & Crisps', items: [] },
          { name: 'Dips', items: [] },
          { name: 'Fresh Fruits', items: [] },
          { name: 'Dry Fruits', items: [] },
          { name: 'Add Ons', items: [] }
        ]
      },
      {
        name: 'Silver Cheese Board',
        type: 'silver',
        price: 3500,
        description: '1000gms • Serves 4-6',
        categories: [
          { name: 'Cheese Selection', items: [] },
          { name: 'Breads & Crisps', items: [] },
          { name: 'Dips', items: [] },
          { name: 'Fresh Fruits', items: [] },
          { name: 'Dry Fruits', items: [] },
          { name: 'Add Ons', items: [] }
        ]
      },
      {
        name: 'Gold Cheese Board',
        type: 'gold',
        price: 5000,
        description: '1500gms • Serves 6-8',
        categories: [
          { name: 'Cheese Selection', items: [] },
          { name: 'Breads & Crisps', items: [] },
          { name: 'Dips', items: [] },
          { name: 'Fresh Fruits', items: [] },
          { name: 'Dry Fruits', items: [] },
          { name: 'Add Ons', items: [] }
        ]
      }
    ];
    
    await CheeseBoard.insertMany(defaultBoards);
    res.json({ message: 'Cheese boards initialized successfully', count: defaultBoards.length });
  } catch (error) {
    console.error('Error initializing cheese boards:', error);
    res.status(500).json({ error: 'Failed to initialize cheese boards' });
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    const orders = await Order.find()
      .lean()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
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

// Get categories by type
router.get('/categories/:type', async (req, res) => {
  try {
    const categories = await Category.find({ type: req.params.type, isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create/Update category (admin only)
router.post('/categories', adminAuth, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category (admin only)
router.put('/categories/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Get images by category
router.get('/images/:category', async (req, res) => {
  try {
    const images = await Image.find({ category: req.params.category, isActive: true })
      .select('-data') // Exclude binary data for listing
      .sort({ sortOrder: 1, uploadedAt: -1 })
      .lean();
    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Upload image (admin only)
router.post('/images', adminAuth, async (req, res) => {
  try {
    const image = new Image(req.body);
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully', image: { ...image.toObject(), data: undefined } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

export default router;
// Get menu limits
router.get('/menu-limits', async (req, res) => {
  try {
    const { menuType, menuVariant } = req.query;
    const filter = {};
    if (menuType) filter.menuType = menuType;
    if (menuVariant) filter.menuVariant = menuVariant;
    
    const limits = await MenuLimit.find(filter).sort({ menuType: 1, menuVariant: 1, category: 1 });
    res.json({ limits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu limits' });
  }
});

// Create/Update menu limit
router.post('/menu-limits', adminAuth, async (req, res) => {
  try {
    const { menuType, menuVariant, category, limit } = req.body;
    
    const menuLimit = await MenuLimit.findOneAndUpdate(
      { menuType, menuVariant, category },
      { limit, isActive: true },
      { new: true, upsert: true }
    );
    
    res.json({ message: 'Menu limit updated successfully', menuLimit });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu limit' });
  }
});

// Delete menu limit
router.delete('/menu-limits/:id', adminAuth, async (req, res) => {
  try {
    await MenuLimit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu limit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu limit' });
  }
});

// Get subcategory limits (unified for all pages)
router.get('/subcategory-limits', async (req, res) => {
  try {
    const { page, pageVariant } = req.query;
    const filter = { isActive: true };
    if (page) filter.page = page;
    if (pageVariant) filter.pageVariant = pageVariant;
    
    const limits = await SubcategoryLimit.find(filter)
      .sort({ page: 1, pageVariant: 1, subcategory: 1 })
      .lean();
    res.json({ limits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategory limits' });
  }
});

// Create/Update subcategory limit
router.post('/subcategory-limits', adminAuth, async (req, res) => {
  try {
    const { page, pageVariant, subcategory, limit } = req.body;
    
    const subcategoryLimit = await SubcategoryLimit.findOneAndUpdate(
      { page, pageVariant, subcategory },
      { limit, isActive: true },
      { new: true, upsert: true }
    );
    
    res.json({ message: 'Subcategory limit updated successfully', subcategoryLimit });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subcategory limit' });
  }
});

// Bulk update subcategory limits
router.post('/subcategory-limits/bulk', adminAuth, async (req, res) => {
  try {
    const { limits } = req.body;
    
    if (!Array.isArray(limits)) {
      return res.status(400).json({ error: 'Limits must be an array' });
    }
    
    const operations = limits.map(({ page, pageVariant, subcategory, limit }) => ({
      updateOne: {
        filter: { page, pageVariant, subcategory },
        update: { limit, isActive: true },
        upsert: true
      }
    }));
    
    await SubcategoryLimit.bulkWrite(operations);
    res.json({ message: 'Subcategory limits updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk update subcategory limits' });
  }
});

// Delete subcategory limit
router.delete('/subcategory-limits/:id', adminAuth, async (req, res) => {
  try {
    await SubcategoryLimit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subcategory limit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subcategory limit' });
  }
});