import mongoose from 'mongoose';
import MenuItem from '../src/models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const curateBoxItems = [
  // BREADS
  { name: "Focaccia Bread", category: "curate-box-item", subcategory: "BREADS", price: 60, sortOrder: 1 },
  { name: "Garlic Bread", category: "curate-box-item", subcategory: "BREADS", price: 50, sortOrder: 2 },
  { name: "Mini Korean Buns", category: "curate-box-item", subcategory: "BREADS", price: 80, sortOrder: 3 },
  { name: "Butter Croissant", category: "curate-box-item", subcategory: "BREADS", price: 50, sortOrder: 4 },
  { name: "Chocolate Croissant", category: "curate-box-item", subcategory: "BREADS", price: 60, sortOrder: 5 },

  // SNACKERS
  { name: "French Fries", category: "curate-box-item", subcategory: "SNACKERS", price: 70, sortOrder: 6 },
  { name: "Paneer Fingers", category: "curate-box-item", subcategory: "SNACKERS", price: 80, sortOrder: 7 },
  { name: "Chicken Popcorn", category: "curate-box-item", subcategory: "SNACKERS", price: 110, sortOrder: 8 },
  { name: "Fish Fingers", category: "curate-box-item", subcategory: "SNACKERS", price: 120, sortOrder: 9 },
  { name: "Potato Wedges", category: "curate-box-item", subcategory: "SNACKERS", price: 70, sortOrder: 10 },
  { name: "Hash Brown", category: "curate-box-item", subcategory: "SNACKERS", price: 60, sortOrder: 11 },
  { name: "Crispy Chicken Wings", category: "curate-box-item", subcategory: "SNACKERS", price: 110, sortOrder: 12 },
  { name: "Egg Puff", category: "curate-box-item", subcategory: "SNACKERS", price: 40, sortOrder: 13 },
  { name: "Spring Rolls", category: "curate-box-item", subcategory: "SNACKERS", price: 70, sortOrder: 14 },
  { name: "Veg Nuggets", category: "curate-box-item", subcategory: "SNACKERS", price: 60, sortOrder: 15 },
  { name: "Chicken Puff", category: "curate-box-item", subcategory: "SNACKERS", price: 45, sortOrder: 16 },
  { name: "Corn Cheese Balls", category: "curate-box-item", subcategory: "SNACKERS", price: 80, sortOrder: 17 },
  { name: "Veg Puff", category: "curate-box-item", subcategory: "SNACKERS", price: 25, sortOrder: 18 },
  { name: "Chicken Springroll", category: "curate-box-item", subcategory: "SNACKERS", price: 110, sortOrder: 19 },
  { name: "Paneer Puff", category: "curate-box-item", subcategory: "SNACKERS", price: 40, sortOrder: 20 },
  { name: "Chicken Cheese Balls", category: "curate-box-item", subcategory: "SNACKERS", price: 120, sortOrder: 21 },
  { name: "Nachos with Salsa", category: "curate-box-item", subcategory: "SNACKERS", price: 120, sortOrder: 22 },
  { name: "Chicken Nuggets", category: "curate-box-item", subcategory: "SNACKERS", price: 110, sortOrder: 23 },
  { name: "Mini Paneer Tikka Samosa", category: "curate-box-item", subcategory: "SNACKERS", price: 40, sortOrder: 24 },
  { name: "Veg Samosa", category: "curate-box-item", subcategory: "SNACKERS", price: 25, sortOrder: 25 },

  // MAINS
  { name: "Veg Pasta", category: "curate-box-item", subcategory: "MAINS", price: 140, sortOrder: 26 },
  { name: "Egg Roll", category: "curate-box-item", subcategory: "MAINS", price: 100, sortOrder: 27 },
  { name: "Chicken Pasta", category: "curate-box-item", subcategory: "MAINS", price: 160, sortOrder: 28 },
  { name: "Veg Roll", category: "curate-box-item", subcategory: "MAINS", price: 90, sortOrder: 29 },
  { name: "Veg Noodles + Sauce", category: "curate-box-item", subcategory: "MAINS", price: 160, sortOrder: 30 },
  { name: "Chicken Roll", category: "curate-box-item", subcategory: "MAINS", price: 120, sortOrder: 31 },
  { name: "Chicken Noodles + Sauce", category: "curate-box-item", subcategory: "MAINS", price: 180, sortOrder: 32 },
  { name: "Mini Veg Burger", category: "curate-box-item", subcategory: "MAINS", price: 100, sortOrder: 33 },
  { name: "Paneer Noodles + Sauce", category: "curate-box-item", subcategory: "MAINS", price: 180, sortOrder: 34 },
  { name: "Mini Chicken Burger", category: "curate-box-item", subcategory: "MAINS", price: 110, sortOrder: 35 },
  { name: "Mini Veg Sandwich", category: "curate-box-item", subcategory: "MAINS", price: 80, sortOrder: 36 },
  { name: "Mini Chicken Sandwich", category: "curate-box-item", subcategory: "MAINS", price: 90, sortOrder: 37 },

  // DESSERTS
  { name: "Brownie Bites", category: "curate-box-item", subcategory: "DESSERTS", price: 80, sortOrder: 38 },
  { name: "Chocolate Balls", category: "curate-box-item", subcategory: "DESSERTS", price: 80, sortOrder: 39 },
  { name: "Choco Chip Muffin", category: "curate-box-item", subcategory: "DESSERTS", price: 60, sortOrder: 40 },
  { name: "Tiramisu", category: "curate-box-item", subcategory: "DESSERTS", price: 80, sortOrder: 41 },
  { name: "Apple Pie", category: "curate-box-item", subcategory: "DESSERTS", price: 90, sortOrder: 42 },
  { name: "Biscoff Mousse Jar", category: "curate-box-item", subcategory: "DESSERTS", price: 90, sortOrder: 43 },
  { name: "Nutella Muffin", category: "curate-box-item", subcategory: "DESSERTS", price: 70, sortOrder: 44 },
  { name: "Chocolate Donut", category: "curate-box-item", subcategory: "DESSERTS", price: 50, sortOrder: 45 },
  { name: "Choco Lava", category: "curate-box-item", subcategory: "DESSERTS", price: 90, sortOrder: 46 },
  { name: "Belgium Chocolate Mousse Jar", category: "curate-box-item", subcategory: "DESSERTS", price: 90, sortOrder: 47 },
  { name: "Banana Walnut Muffin", category: "curate-box-item", subcategory: "DESSERTS", price: 70, sortOrder: 48 },

  // BEVERAGES
  { name: "Lemon Iced Tea", category: "curate-box-item", subcategory: "BEVERAGES", price: 60, sortOrder: 49 },
  { name: "Chocolate Milkshake", category: "curate-box-item", subcategory: "BEVERAGES", price: 90, sortOrder: 50 },
  { name: "Cold Coffee", category: "curate-box-item", subcategory: "BEVERAGES", price: 90, sortOrder: 51 },
  { name: "Strawberry Milkshake", category: "curate-box-item", subcategory: "BEVERAGES", price: 90, sortOrder: 52 },
  { name: "Lime Mint Cooler", category: "curate-box-item", subcategory: "BEVERAGES", price: 60, sortOrder: 53 },
  { name: "Rose Milk", category: "curate-box-item", subcategory: "BEVERAGES", price: 50, sortOrder: 54 },
  { name: "Lemonade", category: "curate-box-item", subcategory: "BEVERAGES", price: 60, sortOrder: 55 },
  { name: "Nannari Sharbat", category: "curate-box-item", subcategory: "BEVERAGES", price: 50, sortOrder: 56 }
];

async function populateCurateBoxItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing curate-box-item entries
    await MenuItem.deleteMany({ category: 'curate-box-item' });
    console.log('Cleared existing curate box items');

    // Insert new items
    await MenuItem.insertMany(curateBoxItems);
    console.log(`Successfully added ${curateBoxItems.length} curate box items`);

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error populating curate box items:', error);
    process.exit(1);
  }
}

populateCurateBoxItems();