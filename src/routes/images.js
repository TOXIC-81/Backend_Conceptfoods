import express from 'express';
import multer from 'multer';
import Image from '../models/Image.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const image = new Image({
      filename: req.file.originalname,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
      category: req.body.category || 'general'
    });

    await image.save();
    
    res.json({
      success: true,
      imageId: image._id,
      filename: image.filename,
      category: image.category
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set({
      'Content-Type': image.mimetype,
      'Content-Length': image.size,
      'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    });
    
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all images metadata
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const images = await Image.find(filter).select('-data');
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;