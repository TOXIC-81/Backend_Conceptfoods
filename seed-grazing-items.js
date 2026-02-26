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

const grazingItems = [
  // Main items
  { name: 'Hummus Platter', category: 'grazing', subcategory: 'main', isVegetarian: true, isAvailable: true, sortOrder: 1 },
  { name: 'Cheese Selection', category: 'grazing', subcategory: 'main', isVegetarian: true, isAvailable: true, sortOrder: 2 },
  { name: 'Charcuterie Board', category: 'grazing', subcategory: 'main', isVegetarian: false, isAvailable: true, sortOrder: 3 },
  
  // Dips
  { name: 'Tzatziki Dip', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 1 },
  { name: 'Baba Ganoush', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 2 },
  { name: 'Spinach Artichoke Dip', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 3 },
  
  // Addons
  { name: 'Olives Mix', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 1 },
  { name: 'Dried Fruits', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 2 },
  { name: 'Fresh Berries', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 3 },
  
  // Bread (if needed, though limit is 0)
  { name: 'Artisan Crackers', category: 'grazing', subcategory: 'bread', isVegetarian: true, isAvailable: true, sortOrder: 1 },
  { name: 'Sourdough Slices', category: 'grazing', subcategory: 'bread', isVegetarian: true, isAvailable: true, sortOrder: 2 }
];

async function seedGrazingItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing grazing items
    await MenuItem.deleteMany({ category: 'grazing' });
    console.log('Cleared existing grazing items');
    
    // Insert new items
    await MenuItem.insertMany(grazingItems);
    console.log(`✓ Inserted ${grazingItems.length} grazing items`);
    
    // Verify
    const count = await MenuItem.countDocuments({ category: 'grazing' });
    console.log(`Total grazing items in DB: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedGrazingItems();
