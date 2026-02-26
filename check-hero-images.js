import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Image from './src/models/Image.js';

dotenv.config();

async function checkHeroImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const heroImages = await Image.find({ category: 'hero', isActive: true }).select('-data');
    
    console.log(`\nFound ${heroImages.length} hero images:`);
    heroImages.forEach((img, idx) => {
      console.log(`${idx + 1}. ID: ${img._id}, Filename: ${img.filename}, SortOrder: ${img.sortOrder}`);
    });
    
    if (heroImages.length === 0) {
      console.log('\n⚠️  No hero images found in database!');
      console.log('You need to upload hero images through the admin panel.');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkHeroImages();
