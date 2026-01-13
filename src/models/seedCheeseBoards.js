import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import MenuItem from '../models/MenuItem.js';
import CheeseBoard from '../models/CheeseBoard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../../.env') });

const boardTypes = [
  { 
    name: 'Classic', 
    type: 'classic',
    price: 2100, 
    description: '800gms, Serves 2-3',
    limits: { cheese: 1, bread: 1, dip: 1, freshFruit: 1, dryFruit: 1, addon: 1 } 
  },
  { 
    name: 'Indian', 
    type: 'indian',
    price: 2500, 
    description: '1000gms, Serves 4-6',
    limits: { cheese: 1, bread: 1, dip: 1, freshFruit: 1, dryFruit: 1, addon: 1 } 
  },
  { 
    name: 'Silver', 
    type: 'silver',
    price: 3500, 
    description: '1000gms, Serves 4-6',
    limits: { cheese: 2, bread: 2, dip: 2, freshFruit: 1, dryFruit: 1, addon: 1 } 
  },
  { 
    name: 'Gold', 
    type: 'gold',
    price: 5000, 
    description: '1500gms, Serves 6-8',
    limits: { cheese: 2, bread: 2, dip: 2, freshFruit: 1, dryFruit: 2, addon: 2 } 
  }
];

const items = [
  // CHEESE
  { name: 'Pickled Feta', subcategory: 'cheese' },
  { name: 'Parmesan Cheese', subcategory: 'cheese' },
  { name: 'English Cheddar', subcategory: 'cheese' },
  { name: 'Goat Chesse', subcategory: 'cheese' },
  { name: 'Bocconcini Cheese', subcategory: 'cheese' },
  { name: 'Herbs and Pepper', subcategory: 'cheese' },
  { name: 'Cheddar Chilly Hives', subcategory: 'cheese' },
  { name: 'Emmenthal Cheese', subcategory: 'cheese' },
  { name: 'Gouda Cheese', subcategory: 'cheese' },
  { name: 'Halloumi Cheese', subcategory: 'cheese' },
  { name: 'Roasted Garlic Feta', subcategory: 'cheese' },
  { name: 'Pepper Garlic Cheese', subcategory: 'cheese' },
  { name: 'Cheese Ball (Oregano, Parsley & Chilli Flakes)', subcategory: 'cheese' },

  // BREADS & CRISPS
  { name: 'Focaccia Bread', subcategory: 'bread' },
  { name: 'Millet Bread Slices', subcategory: 'bread' },
  { name: 'Multigrain Bread', subcategory: 'bread' },
  { name: 'Dinner Rolls', subcategory: 'bread' },
  { name: 'Korean Cheese Bun', subcategory: 'bread' },
  { name: 'Lavash', subcategory: 'bread' },
  { name: 'Choco Marble Cake', subcategory: 'bread' },
  { name: 'Sweet Buns', subcategory: 'bread' },
  { name: 'Tea Cake Slices', subcategory: 'bread' },
  { name: 'Banana Walnut Cake', subcategory: 'bread' },
  { name: 'Garlic Bread', subcategory: 'bread' },
  { name: 'Cheese Sticks', subcategory: 'bread' },
  { name: 'Crackers', subcategory: 'bread' },
  { name: 'Pav Buns', subcategory: 'bread' }, // Indian specific
  { name: 'Mini Nan Bites', subcategory: 'bread' }, // Indian specific
  { name: 'Khakra', subcategory: 'bread' }, // Indian specific

  // DIPS
  { name: 'Chilli Jam', subcategory: 'dip' },
  { name: 'Guacamole', subcategory: 'dip' },
  { name: 'Salsa', subcategory: 'dip' },
  { name: 'Hummus', subcategory: 'dip' },
  { name: 'Cheese & Jalapeno', subcategory: 'dip' },
  { name: 'Basil and Walnut Pesto', subcategory: 'dip' },
  { name: 'Pesto Sauce', subcategory: 'dip' },
  { name: 'Chipotle Dip', subcategory: 'dip' },
  { name: 'Strawberry Jam', subcategory: 'dip' },
  { name: 'Avvakai & Hung Curd', subcategory: 'dip' }, // Indian specific
  { name: 'Bhajji (Pav Buns)', subcategory: 'dip' }, // Indian specific

  // FRESH FRUITS
  { name: 'Grapes', subcategory: 'fresh-fruit' },
  { name: 'Apple', subcategory: 'fresh-fruit' },
  { name: 'Orange', subcategory: 'fresh-fruit' },
  { name: 'Green Kiwi', subcategory: 'fresh-fruit' },

  // DRY FRUITS
  { name: 'Cashew Nuts', subcategory: 'dry-fruit' },
  { name: 'Saled Nuts', subcategory: 'dry-fruit' },
  { name: 'Pistachio', subcategory: 'dry-fruit' },
  { name: 'Apricot and Figs', subcategory: 'dry-fruit' },
  { name: 'Raisins and Almonds', subcategory: 'dry-fruit' },

  // ADD ONS
  { name: 'Dark Chocolaote', subcategory: 'addon' },
  { name: 'Mixed Veg Batons', subcategory: 'addon' },
  { name: 'Choco Chip Cookies', subcategory: 'addon' },
  { name: 'Green Olives', subcategory: 'addon' },
  { name: 'Choco Truffle Pastry', subcategory: 'addon' },
  { name: 'Corn Flakes Cookies', subcategory: 'addon' },
  { name: 'Apple Pie', subcategory: 'addon' },
  { name: 'Cold Coffee', subcategory: 'addon' },
  { name: 'Mini Brownies', subcategory: 'addon' },
  { name: 'Mixed Crackers', subcategory: 'addon' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Seed Boards
    console.log('Seeding Cheese Boards...');
    for (const board of boardTypes) {
      await CheeseBoard.findOneAndUpdate(
        { type: board.type },
        board,
        { upsert: true, new: true }
      );
    }

    // Seed Items
    console.log('Seeding Menu Items...');
    // First, remove existing cheese-board items to avoid duplicates/stale data
    // Optional: Comment out if you want to keep existing items
    // await MenuItem.deleteMany({ category: 'cheese-board' });

    for (const item of items) {
      await MenuItem.findOneAndUpdate(
        { name: item.name, category: 'cheese-board' },
        {
          ...item,
          category: 'cheese-board',
          price: 0,
          isVegetarian: true,
          isAvailable: true
        },
        { upsert: true, new: true }
      );
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();