import mongoose from 'mongoose';
import MenuItem from '../src/models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

async function deleteSticksItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete all items with STICKS subcategory
    const result = await MenuItem.deleteMany({ 
      category: 'curate-box-item',
      subcategory: 'stick'
    });
    
    console.log(`Deleted ${result.deletedCount} STICKS items`);

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error deleting STICKS items:', error);
    process.exit(1);
  }
}

deleteSticksItems();
