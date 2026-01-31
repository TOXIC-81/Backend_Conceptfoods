import mongoose from 'mongoose';
import Category from '../models/Category.js';
import MenuItem from '../models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const seedCategories = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing categories
    console.log('Clearing existing categories...');
    await Category.deleteMany({});
    console.log('Existing categories cleared');
    
    // Catering categories
    const cateringCategories = [
      { name: 'welcome-drink', displayName: 'Welcome Drink', type: 'catering', maxSelections: 1, isRequired: true, sortOrder: 1, icon: 'fa-glass-cheers' },
      { name: 'soups', displayName: 'Soups', type: 'catering', maxSelections: 2, isRequired: true, sortOrder: 2, icon: 'fa-bowl-hot' },
      { name: 'salads', displayName: 'Salads', type: 'catering', maxSelections: 2, isRequired: true, sortOrder: 3, icon: 'fa-leaf' },
      { name: 'breads', displayName: 'Breads', type: 'catering', maxSelections: 3, isRequired: true, sortOrder: 4, icon: 'fa-bread-slice' },
      { name: 'starters-veg', displayName: 'Starters - Veg', type: 'catering', maxSelections: 3, isRequired: false, sortOrder: 5, icon: 'fa-seedling' },
      { name: 'starters-nonveg', displayName: 'Starters - Non Veg', type: 'catering', maxSelections: 3, isRequired: false, sortOrder: 6, icon: 'fa-drumstick-bite' },
      { name: 'dhal', displayName: 'Dhal Variety', type: 'catering', maxSelections: 2, isRequired: true, sortOrder: 7, icon: 'fa-circle' },
      { name: 'rice-noodles', displayName: 'Rice / Noodles', type: 'catering', maxSelections: 2, isRequired: true, sortOrder: 8, icon: 'fa-utensils' },
      { name: 'dry', displayName: 'Veg Dry / Non Veg Dry', type: 'catering', maxSelections: 3, isRequired: true, sortOrder: 9, icon: 'fa-pepper-hot' },
      { name: 'gravy', displayName: 'Veg Gravy / Non Veg Gravy', type: 'catering', maxSelections: 3, isRequired: true, sortOrder: 10, icon: 'fa-bowl-food' },
      { name: 'accompaniments', displayName: 'Accompaniments', type: 'catering', maxSelections: 5, isRequired: false, sortOrder: 11, icon: 'fa-plus' },
      { name: 'desserts', displayName: 'Desserts', type: 'catering', maxSelections: 2, isRequired: true, sortOrder: 12, icon: 'fa-birthday-cake' }
    ];
    
    // Grazing categories
    const grazingCategories = [
      { name: 'nuts', displayName: 'Variety of nuts', type: 'grazing', maxSelections: 5, isRequired: true, sortOrder: 1, icon: 'fa-seedling' },
      { name: 'fruits-vegetables', displayName: 'Seasonal fruits and vegetables', type: 'grazing', maxSelections: 8, isRequired: true, sortOrder: 2, icon: 'fa-apple-alt' },
      { name: 'salads', displayName: 'Curated salads', type: 'grazing', maxSelections: 4, isRequired: true, sortOrder: 3, icon: 'fa-leaf' },
      { name: 'finger-food', displayName: 'Relaxed Finger Food', type: 'grazing', maxSelections: 6, isRequired: true, sortOrder: 4, icon: 'fa-utensils' },
      { name: 'sandwiches', displayName: 'Variety of Sandwiches/Burgers', type: 'grazing', maxSelections: 4, isRequired: true, sortOrder: 5, icon: 'fa-hamburger' },
      { name: 'canapes', displayName: 'Canapes and Tarts', type: 'grazing', maxSelections: 6, isRequired: true, sortOrder: 6, icon: 'fa-cookie-bite' },
      { name: 'cured-meats', displayName: 'Cured meats', type: 'grazing', maxSelections: 3, isRequired: false, sortOrder: 7, icon: 'fa-bacon' },
      { name: 'crackers', displayName: 'Hand selected crackers', type: 'grazing', maxSelections: 4, isRequired: true, sortOrder: 8, icon: 'fa-bread-slice' },
      { name: 'dips', displayName: 'Quality dips', type: 'grazing', maxSelections: 5, isRequired: true, sortOrder: 9, icon: 'fa-pepper-hot' },
      { name: 'mains', displayName: 'Mains', type: 'grazing', maxSelections: 3, isRequired: false, sortOrder: 10, icon: 'fa-drumstick-bite' },
      { name: 'sweets', displayName: 'Sweets platter', type: 'grazing', maxSelections: 4, isRequired: true, sortOrder: 11, icon: 'fa-candy-cane' },
      { name: 'chocolates', displayName: 'Chocolates', type: 'grazing', maxSelections: 3, isRequired: true, sortOrder: 12, icon: 'fa-cookie' },
      { name: 'dessert-platters', displayName: 'Dessert Platters', type: 'grazing', maxSelections: 3, isRequired: true, sortOrder: 13, icon: 'fa-birthday-cake' }
    ];
    
    // Boxes categories
    const boxesCategories = [
      { name: 'mains', displayName: 'Mains', type: 'boxes', maxSelections: 1, isRequired: true, sortOrder: 1, icon: 'fa-utensils' },
      { name: 'desserts', displayName: 'Desserts', type: 'boxes', maxSelections: 1, isRequired: true, sortOrder: 2, icon: 'fa-birthday-cake' },
      { name: 'beverages', displayName: 'Beverages', type: 'boxes', maxSelections: 1, isRequired: true, sortOrder: 3, icon: 'fa-coffee' },
      { name: 'snackers', displayName: 'Snackers', type: 'boxes', maxSelections: 2, isRequired: false, sortOrder: 4, icon: 'fa-cookie' }
    ];
    
    // Cheese boards categories
    const cheeseCategories = [
      { name: 'cheese', displayName: 'Cheese Selection', type: 'cheese-boards', maxSelections: 5, isRequired: true, sortOrder: 1, icon: 'fa-cheese' },
      { name: 'bread', displayName: 'Bread & Crackers', type: 'cheese-boards', maxSelections: 3, isRequired: true, sortOrder: 2, icon: 'fa-bread-slice' },
      { name: 'dip', displayName: 'Dips & Spreads', type: 'cheese-boards', maxSelections: 3, isRequired: true, sortOrder: 3, icon: 'fa-pepper-hot' },
      { name: 'fresh-fruit', displayName: 'Fresh Fruits', type: 'cheese-boards', maxSelections: 4, isRequired: true, sortOrder: 4, icon: 'fa-apple-alt' },
      { name: 'dry-fruit', displayName: 'Nuts & Dried Fruits', type: 'cheese-boards', maxSelections: 3, isRequired: true, sortOrder: 5, icon: 'fa-seedling' },
      { name: 'addon', displayName: 'Add-ons', type: 'cheese-boards', maxSelections: 5, isRequired: false, sortOrder: 6, icon: 'fa-plus' }
    ];
    
    // Insert all categories
    console.log('Inserting categories...');
    await Category.insertMany([...cateringCategories, ...grazingCategories, ...boxesCategories, ...cheeseCategories]);
    console.log('Categories inserted successfully');
    
    console.log('Categories seeded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

export default seedCategories;

if (import.meta.url === `file://${process.argv[1]}`) {
  seedCategories();
}