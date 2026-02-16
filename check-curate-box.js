import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './src/models/MenuItem.js';
import Category from './src/models/Category.js';

dotenv.config();

async function checkCurateBoxData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // Check curate-box items
    console.log('=== CURATE BOX ITEMS ===');
    const items = await MenuItem.find({ category: 'curate-box-item' });
    console.log(`Found ${items.length} curate-box items:\n`);
    
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name}`);
      console.log(`   - Subcategory: ${item.subcategory}`);
      console.log(`   - Price: ₹${item.price}`);
      console.log(`   - Vegetarian: ${item.isVegetarian}`);
      console.log(`   - Available: ${item.isAvailable}`);
      console.log('');
    });

    // Check categories
    console.log('\n=== CATEGORIES (type: boxes) ===');
    const categories = await Category.find({ type: 'boxes' });
    console.log(`Found ${categories.length} categories:\n`);
    
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.displayName} (${cat.name})`);
      console.log(`   - Active: ${cat.isActive}`);
      console.log(`   - Icon: ${cat.icon}`);
      console.log('');
    });

    // Group items by subcategory
    console.log('\n=== ITEMS GROUPED BY SUBCATEGORY ===');
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.subcategory]) {
        grouped[item.subcategory] = [];
      }
      grouped[item.subcategory].push(item.name);
    });

    Object.keys(grouped).forEach(subcategory => {
      console.log(`\n${subcategory}:`);
      grouped[subcategory].forEach(name => {
        console.log(`  - ${name}`);
      });
    });

    await mongoose.disconnect();
    console.log('\n\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCurateBoxData();
