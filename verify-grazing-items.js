import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const menuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  subcategory: String,
  isVegetarian: Boolean,
  isAvailable: Boolean,
  sortOrder: Number
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

async function verifyGrazingItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');
    
    const items = await MenuItem.find({ category: 'grazing' });
    console.log(`Total grazing items: ${items.length}\n`);
    
    if (items.length > 0) {
      console.log('Items found:');
      items.forEach(item => {
        console.log(`- ${item.name} (${item.subcategory}) - Available: ${item.isAvailable}`);
      });
    } else {
      console.log('❌ No grazing items found in database!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyGrazingItems();
