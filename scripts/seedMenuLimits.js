import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuLimit from '../src/models/MenuLimit.js';

dotenv.config();

const defaultLimits = [
  // Catering limits
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'welcome-drink', limit: 2 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'soups', limit: 2 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'salads', limit: 3 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'breads', limit: 3 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'starters-veg', limit: 4 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'dhal', limit: 2 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'rice-noodles', limit: 3 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'dry', limit: 4 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'gravy', limit: 4 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'accompaniments', limit: 3 },
  { menuType: 'catering', menuVariant: 'classic-veg', category: 'desserts', limit: 3 },

  // Silver veg - higher limits
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'welcome-drink', limit: 3 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'soups', limit: 3 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'salads', limit: 4 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'breads', limit: 4 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'starters-veg', limit: 5 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'dhal', limit: 3 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'rice-noodles', limit: 4 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'dry', limit: 5 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'gravy', limit: 5 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'accompaniments', limit: 4 },
  { menuType: 'catering', menuVariant: 'silver-veg', category: 'desserts', limit: 4 },

  // Mixed menus include non-veg starters
  { menuType: 'catering', menuVariant: 'classic-mixed', category: 'starters-nonveg', limit: 3 },
  { menuType: 'catering', menuVariant: 'silver-mixed', category: 'starters-nonveg', limit: 4 },
  { menuType: 'catering', menuVariant: 'gold-mixed', category: 'starters-nonveg', limit: 5 },

  // Grazing limits
  { menuType: 'grazing', menuVariant: 'classic', category: 'nuts', limit: 3 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'fruits-vegetables', limit: 4 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'salads', limit: 3 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'finger-food', limit: 5 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'sandwiches', limit: 4 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'canapes', limit: 4 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'cured-meats', limit: 2 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'crackers', limit: 3 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'dips', limit: 4 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'mains', limit: 2 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'sweets', limit: 3 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'chocolates', limit: 2 },
  { menuType: 'grazing', menuVariant: 'classic', category: 'dessert-platters', limit: 2 },

  // Deluxe grazing - higher limits
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'nuts', limit: 4 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'fruits-vegetables', limit: 5 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'salads', limit: 4 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'finger-food', limit: 6 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'sandwiches', limit: 5 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'canapes', limit: 5 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'cured-meats', limit: 3 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'crackers', limit: 4 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'dips', limit: 5 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'mains', limit: 3 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'sweets', limit: 4 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'chocolates', limit: 3 },
  { menuType: 'grazing', menuVariant: 'deluxe', category: 'dessert-platters', limit: 3 }
];

async function seedMenuLimits() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await MenuLimit.deleteMany({});
    console.log('Cleared existing menu limits');

    const result = await MenuLimit.insertMany(defaultLimits);
    console.log(`Inserted ${result.length} menu limits`);

    console.log('Menu limits seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedMenuLimits();