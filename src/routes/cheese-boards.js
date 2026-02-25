import express from 'express';
import CheeseBoard from '../models/CheeseBoard.js';
import MenuItem from '../models/MenuItem.js';
import SubcategoryLimit from '../models/SubcategoryLimit.js';
const router = express.Router();

// Get all active cheese boards
router.get('/cheese-boards', async (req, res) => {
    try {
        const cheeseBoards = await CheeseBoard.find({ isActive: true });
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


export default router;