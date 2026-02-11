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
    if (!req.file && !req.body.imageUrl) {
      return res.status(400).json({ error: 'No image file or URL provided' });
    }

    const imageData = {
      category: req.body.category || 'general',
      sortOrder: parseInt(req.body.sortOrder) || 0,
      isActive: req.body.isActive !== 'false'
    };

    if (req.body.imageUrl) {
      imageData.imageUrl = req.body.imageUrl;
      imageData.filename = req.body.imageUrl.split('/').pop();
      imageData.originalName = imageData.filename;
      imageData.mimetype = 'image/jpeg';
      imageData.size = 0;
      imageData.data = Buffer.from('');
    } else {
      imageData.filename = req.file.originalname;
      imageData.originalName = req.file.originalname;
      imageData.mimetype = req.file.mimetype;
      imageData.size = req.file.size;
      imageData.data = req.file.buffer;
    }

    const image = new Image(imageData);
    await image.save();
    
    res.json({
      success: true,
      imageId: image._id,
      filename: image.filename,
      category: image.category,
      imageUrl: image.imageUrl
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
    const filter = category ? { category, isActive: true } : { isActive: true };
    
    const images = await Image.find(filter).select('-data').sort({ sortOrder: 1, uploadedAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update image
router.put('/:id', async (req, res) => {
  try {
    const { sortOrder, isActive, imageUrl } = req.body;
    const updateData = {};
    
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    
    const image = await Image.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-data');
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ success: true, image });
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