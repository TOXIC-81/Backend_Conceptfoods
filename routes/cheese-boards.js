import express from 'express';
import CheeseBoard from '../models/CheeseBoard.js';
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

// Get specific cheese board by ID or by type slug
router.get('/cheese-boards/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let cheeseBoard = null;

        // Try to find by MongoDB ObjectId first
        try {
            cheeseBoard = await CheeseBoard.findById(id);
        } catch (err) {
            // ignore invalid ObjectId error and try by type
            cheeseBoard = null;
        }

        // If not found by id, try to find by `type` field (e.g., 'indian')
        if (!cheeseBoard) {
            cheeseBoard = await CheeseBoard.findOne({ type: id, isActive: true });
        }

        if (!cheeseBoard) {
            return res.status(404).json({ error: 'Cheese board not found' });
        }

        // Return shape expected by frontend: { board: { ... } }
        res.json({ board: cheeseBoard });
    } catch (error) {
        console.error('Error fetching cheese board:', error);
        res.status(500).json({ error: 'Failed to fetch cheese board' });
    }
});

export default router;