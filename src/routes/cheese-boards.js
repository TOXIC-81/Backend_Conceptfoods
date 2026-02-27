import express from 'express';
import CheeseBoard from '../models/CheeseBoard.js';
import MenuItem from '../models/MenuItem.js';
import SubcategoryLimit from '../models/SubcategoryLimit.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

const router = express.Router();

// Admin middleware
const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.adminId) {
            const admin = await Admin.findById(decoded.adminId);
            if (!admin) return res.status(401).json({ message: "Invalid token" });
            req.admin = admin;
        } else if (decoded.userId) {
            const user = await User.findById(decoded.userId);
            if (!user || !user.isAdmin) return res.status(403).json({ message: "Admin access required" });
            req.admin = user;
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Get all active cheese boards
router.get('/cheese-boards', async (req, res) => {
    try {
        const cheeseBoards = await CheeseBoard.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        // Return shape expected by frontend: { boards: [...] }
        res.json({ boards: cheeseBoards });
    } catch (error) {
        console.error('Error fetching cheese boards:', error);
        res.status(500).json({ error: 'Failed to fetch cheese boards' });
    }
});

// Get cheese board menu items (public endpoint)
router.get('/cheese-boards/items/:boardType', async (req, res) => {
    try {
        const { boardType } = req.params;
        const items = await MenuItem.find({ 
            category: 'cheese-board',
            pageOption: boardType,
            isAvailable: true 
        });
        res.json({ items });
    } catch (error) {
        console.error('Error fetching cheese board items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Get cheese board category limits (public endpoint)
router.get('/cheese-boards/limits/:boardType', async (req, res) => {
    try {
        const { boardType } = req.params;
        const limits = await SubcategoryLimit.find({ 
            page: 'cheese-boards',
            pageVariant: boardType
        }).sort({ sortOrder: 1, createdAt: 1 });
        res.json({ limits });
    } catch (error) {
        console.error('Error fetching limits:', error);
        res.status(500).json({ error: 'Failed to fetch limits' });
    }
});

// Delete cheese board (admin only)
router.delete('/cheese-boards/:id', adminAuth, async (req, res) => {
    try {
        const board = await CheeseBoard.findByIdAndDelete(req.params.id);
        if (!board) {
            return res.status(404).json({ error: 'Cheese board not found' });
        }
        res.json({ message: 'Cheese board deleted successfully' });
    } catch (error) {
        console.error('Error deleting cheese board:', error);
        res.status(500).json({ error: 'Failed to delete cheese board' });
    }
});

// Update cheese board (admin only)
router.put('/cheese-boards/:id', adminAuth, async (req, res) => {
    try {
        const { name, price, order, description } = req.body;
        const updateData = {};
        
        if (name !== undefined) updateData.name = name;
        if (price !== undefined) updateData.price = price;
        if (order !== undefined) updateData.order = order;
        if (description !== undefined) updateData.description = description;
        
        const board = await CheeseBoard.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!board) {
            return res.status(404).json({ error: 'Cheese board not found' });
        }
        
        res.json({ message: 'Cheese board updated successfully', board });
    } catch (error) {
        console.error('Error updating cheese board:', error);
        res.status(500).json({ error: 'Failed to update cheese board' });
    }
});

// Create cheese board (admin only)
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


export default router;