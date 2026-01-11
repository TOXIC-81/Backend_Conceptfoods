import mongoose from 'mongoose';
import MenuItem from '../src/models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const cheeseboardItems = [
  // CHEESE OPTIONS
  { name: "Pickled Feta", category: "cheese", price: 0, sortOrder: 1 },
  { name: "Parmesan Cheese", category: "cheese", price: 0, sortOrder: 2 },
  { name: "English Cheddar", category: "cheese", price: 0, sortOrder: 3 },
  { name: "Goat Cheese", category: "cheese", price: 0, sortOrder: 4 },
  { name: "Bocconcini Cheese", category: "cheese", price: 0, sortOrder: 5 },
  { name: "Herbs and Pepper", category: "cheese", price: 0, sortOrder: 6 },
  { name: "Cheddar Chilly Hives", category: "cheese", price: 0, sortOrder: 7 },
  { name: "Emmenthal Cheese", category: "cheese", price: 0, sortOrder: 8 },
  { name: "Gouda Cheese", category: "cheese", price: 0, sortOrder: 9 },
  { name: "Halloumi Cheese", category: "cheese", price: 0, sortOrder: 10 },
  { name: "Roasted Garlic Feta", category: "cheese", price: 0, sortOrder: 11 },
  { name: "Pepper Garlic Cheese", category: "cheese", price: 0, sortOrder: 12 },
  { name: "Cheese Ball (Oregano, Parsley & Chilli Flakes)", category: "cheese", price: 0, sortOrder: 13 },

  // BREADS & CRISPS
  { name: "Focaccia Bread", category: "bread", price: 0, sortOrder: 14 },
  { name: "Millet Bread Slices", category: "bread", price: 0, sortOrder: 15 },
  { name: "Multigrain Bread", category: "bread", price: 0, sortOrder: 16 },
  { name: "Dinner Rolls", category: "bread", price: 0, sortOrder: 17 },
  { name: "Korean Cheese Bun", category: "bread", price: 0, sortOrder: 18 },
  { name: "Lavash", category: "bread", price: 0, sortOrder: 19 },
  { name: "Choco Marble Cake", category: "bread", price: 0, sortOrder: 20 },
  { name: "Pav Buns", category: "bread", price: 0, sortOrder: 21 },
  { name: "Sweet Buns", category: "bread", price: 0, sortOrder: 22 },
  { name: "Tea Cake Slices", category: "bread", price: 0, sortOrder: 23 },
  { name: "Banana Walnut Cake", category: "bread", price: 0, sortOrder: 24 },
  { name: "Mini Nan Bites", category: "bread", price: 0, sortOrder: 25 },
  { name: "Garlic Bread", category: "bread", price: 0, sortOrder: 26 },
  { name: "Cheese Sticks", category: "bread", price: 0, sortOrder: 27 },
  { name: "Crackers", category: "bread", price: 0, sortOrder: 28 },
  { name: "Khakra", category: "bread", price: 0, sortOrder: 29 },

  // DIPS
  { name: "Chilli Jam", category: "dip", price: 0, sortOrder: 30 },
  { name: "Guacamole", category: "dip", price: 0, sortOrder: 31 },
  { name: "Salsa", category: "dip", price: 0, sortOrder: 32 },
  { name: "Pesto Sauce", category: "dip", price: 0, sortOrder: 33 },
  { name: "Avvakai & Hung Curd", category: "dip", price: 0, sortOrder: 34 },
  { name: "Cheese & Jalapeno", category: "dip", price: 0, sortOrder: 35 },
  { name: "Basil and Walnut Pesto", category: "dip", price: 0, sortOrder: 36 },
  { name: "Bhajji (Pav Buns)", category: "dip", price: 0, sortOrder: 37 },
  { name: "Hummus", category: "dip", price: 0, sortOrder: 38 },
  { name: "Chipotle Dip", category: "dip", price: 0, sortOrder: 39 },
  { name: "Strawberry Jam", category: "dip", price: 0, sortOrder: 40 },

  // FRESH FRUITS
  { name: "Grapes", category: "fresh-fruit", price: 0, sortOrder: 41 },
  { name: "Apple", category: "fresh-fruit", price: 0, sortOrder: 42 },
  { name: "Orange", category: "fresh-fruit", price: 0, sortOrder: 43 },
  { name: "Green Kiwi", category: "fresh-fruit", price: 0, sortOrder: 44 },

  // DRY FRUITS
  { name: "Cashew Nuts", category: "dry-fruit", price: 0, sortOrder: 45 },
  { name: "Salted Nuts", category: "dry-fruit", price: 0, sortOrder: 46 },
  { name: "Pistachio", category: "dry-fruit", price: 0, sortOrder: 47 },
  { name: "Apricot and Figs", category: "dry-fruit", price: 0, sortOrder: 48 },
  { name: "Raisins and Almonds", category: "dry-fruit", price: 0, sortOrder: 49 },

  // ADD ONS
  { name: "Dark Chocolate", category: "addon", price: 0, sortOrder: 50 },
  { name: "Mixed Veg Batons", category: "addon", price: 0, sortOrder: 51 },
  { name: "Choco Chip Cookies", category: "addon", price: 0, sortOrder: 52 },
  { name: "Green Olives", category: "addon", price: 0, sortOrder: 53 },
  { name: "Choco Truffle Pastry", category: "addon", price: 0, sortOrder: 54 },
  { name: "Corn Flakes Cookies", category: "addon", price: 0, sortOrder: 55 },
  { name: "Apple Pie", category: "addon", price: 0, sortOrder: 56 },
  { name: "Cold Coffee", category: "addon", price: 0, sortOrder: 57 },
  { name: "Mini Brownies", category: "addon", price: 0, sortOrder: 58 },
  { name: "Mixed Crackers", category: "addon", price: 0, sortOrder: 59 }
];

async function populateCheeseboardItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing cheeseboard items
    await MenuItem.deleteMany({ 
      category: { $in: ['cheese', 'bread', 'dip', 'fresh-fruit', 'dry-fruit', 'addon'] }
    });
    console.log('Cleared existing cheeseboard items');

    // Insert new items
    await MenuItem.insertMany(cheeseboardItems);
    console.log(`Successfully added ${cheeseboardItems.length} cheeseboard items`);

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error populating cheeseboard items:', error);
    process.exit(1);
  }
}

populateCheeseboardItems();