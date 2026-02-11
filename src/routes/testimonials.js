import express from 'express';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// Get all active testimonials (public)
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json({ testimonials });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin routes
router.get('/testimonials-admin', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
        res.json({ testimonials });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/testimonials-admin', async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        res.json({ message: 'Testimonial created', testimonial });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/testimonials-admin/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Testimonial updated', testimonial });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/testimonials-admin/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
