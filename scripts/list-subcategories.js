import mongoose from 'mongoose';
import MenuItem from '../src/models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

async function listSubcategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all curate-box-item items
    const items = await MenuItem.find({ category: 'curate-box-item' });
    
    console.log(`\nTotal curate-box-item items: ${items.length}\n`);
    
    // Group by subcategory
    const grouped = {};
    items.forEach(item => {
      const sub = item.subcategory || 'NO_SUBCATEGORY';
      if (!grouped[sub]) {
        grouped[sub] = [];
      }
      grouped[sub].push(item.name);
    });
    
    // Display results
    Object.keys(grouped).sort().forEach(sub => {
      console.log(`\n${sub} (${grouped[sub].length} items):`);
      grouped[sub].forEach(name => console.log(`  - ${name}`));
    });

    await mongoose.disconnect();
    console.log('\n\nDatabase connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

listSubcategories();
