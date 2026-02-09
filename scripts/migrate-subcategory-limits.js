import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SubcategoryLimit from '../src/models/SubcategoryLimit.js';

dotenv.config();

const defaultLimits = [
    // Catering limits
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'welcome-drink', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'soups', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'salads', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'breads', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'starters-veg', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'starters-nonveg', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'dhal', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'rice-noodles', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'dry', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'gravy', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'accompaniments', limit: 2 },
    { page: 'catering', pageVariant: 'classic-veg', subcategory: 'desserts', limit: 2 },
    
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'welcome-drink', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'soups', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'salads', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'breads', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'starters-veg', limit: 3 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'starters-nonveg', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'dhal', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'rice-noodles', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'dry', limit: 3 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'gravy', limit: 3 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'accompaniments', limit: 2 },
    { page: 'catering', pageVariant: 'silver-veg', subcategory: 'desserts', limit: 2 },
    
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'welcome-drink', limit: 3 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'soups', limit: 2 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'salads', limit: 3 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'breads', limit: 3 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'starters-veg', limit: 4 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'starters-nonveg', limit: 2 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'dhal', limit: 2 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'rice-noodles', limit: 3 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'dry', limit: 4 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'gravy', limit: 4 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'accompaniments', limit: 3 },
    { page: 'catering', pageVariant: 'gold-veg', subcategory: 'desserts', limit: 3 },
    
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'welcome-drink', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'soups', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'salads', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'breads', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'starters-veg', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'starters-nonveg', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'dhal', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'rice-noodles', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'dry', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'gravy', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'accompaniments', limit: 2 },
    { page: 'catering', pageVariant: 'classic-mixed', subcategory: 'desserts', limit: 2 },
    
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'welcome-drink', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'soups', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'salads', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'breads', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'starters-veg', limit: 3 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'starters-nonveg', limit: 3 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'dhal', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'rice-noodles', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'dry', limit: 3 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'gravy', limit: 3 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'accompaniments', limit: 2 },
    { page: 'catering', pageVariant: 'silver-mixed', subcategory: 'desserts', limit: 2 },
    
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'welcome-drink', limit: 3 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'soups', limit: 2 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'salads', limit: 3 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'breads', limit: 3 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'starters-veg', limit: 4 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'starters-nonveg', limit: 4 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'dhal', limit: 2 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'rice-noodles', limit: 3 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'dry', limit: 4 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'gravy', limit: 4 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'accompaniments', limit: 3 },
    { page: 'catering', pageVariant: 'gold-mixed', subcategory: 'desserts', limit: 3 },
    
    // Grazing limits
    { page: 'grazing', pageVariant: 'classic', subcategory: 'nuts', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'fruits-vegetables', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'salads', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'finger-food', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'sandwiches', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'canapes', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'cured-meats', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'crackers', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'dips', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'mains', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'sweets', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'chocolates', limit: 3 },
    { page: 'grazing', pageVariant: 'classic', subcategory: 'dessert-platters', limit: 3 },
    
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'nuts', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'fruits-vegetables', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'salads', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'finger-food', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'sandwiches', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'canapes', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'cured-meats', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'crackers', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'dips', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'mains', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'sweets', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'chocolates', limit: 4 },
    { page: 'grazing', pageVariant: 'deluxe', subcategory: 'dessert-platters', limit: 4 },
    
    { page: 'grazing', pageVariant: 'gold', subcategory: 'nuts', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'fruits-vegetables', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'salads', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'finger-food', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'sandwiches', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'canapes', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'cured-meats', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'crackers', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'dips', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'mains', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'sweets', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'chocolates', limit: 5 },
    { page: 'grazing', pageVariant: 'gold', subcategory: 'dessert-platters', limit: 5 },
    
    // Cheese boards limits
    { page: 'cheese-boards', pageVariant: 'classic', subcategory: 'cheese', limit: 3 },
    { page: 'cheese-boards', pageVariant: 'classic', subcategory: 'bread', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'classic', subcategory: 'dip', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'classic', subcategory: 'fresh-fruit', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'classic', subcategory: 'dry-fruit', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'classic', subcategory: 'addon', limit: 1 },
    
    { page: 'cheese-boards', pageVariant: 'indian', subcategory: 'cheese', limit: 3 },
    { page: 'cheese-boards', pageVariant: 'indian', subcategory: 'bread', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'indian', subcategory: 'dip', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'indian', subcategory: 'fresh-fruit', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'indian', subcategory: 'dry-fruit', limit: 2 },
    { page: 'cheese-boards', pageVariant: 'indian', subcategory: 'addon', limit: 1 },
    
    { page: 'cheese-boards', pageVariant: 'silver', subcategory: 'cheese', limit: 4 },
    { page: 'cheese-boards', pageVariant: 'silver', subcategory: 'bread', limit: 3 },
    { page: 'cheese-boards', pageVariant: 'silver', subcategory: 'dip', limit: 3 },
    { page: 'cheese-boards', pageVariant: 'silver', subcategory: 'fresh-fruit', limit: 3 },
    { page: 'cheese-boards', pageVariant: 'silver', subcategory: 'dry-fruit', limit: 3 },
    { page: 'cheese-boards', pageVariant: 'silver', subcategory: 'addon', limit: 2 },
    
    { page: 'cheese-boards', pageVariant: 'gold', subcategory: 'cheese', limit: 5 },
    { page: 'cheese-boards', pageVariant: 'gold', subcategory: 'bread', limit: 4 },
    { page: 'cheese-boards', pageVariant: 'gold', subcategory: 'dip', limit: 4 },
    { page: 'cheese-boards', pageVariant: 'gold', subcategory: 'fresh-fruit', limit: 4 },
    { page: 'cheese-boards', pageVariant: 'gold', subcategory: 'dry-fruit', limit: 4 },
    { page: 'cheese-boards', pageVariant: 'gold', subcategory: 'addon', limit: 3 }
];

async function migrateSubcategoryLimits() {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MongoDB URI not found in environment variables');
        }
        
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await SubcategoryLimit.deleteMany({});
        console.log('Cleared existing subcategory limits');
        
        // Insert default limits
        await SubcategoryLimit.insertMany(defaultLimits);
        console.log(`Inserted ${defaultLimits.length} subcategory limits`);
        
        // Verify
        const count = await SubcategoryLimit.countDocuments();
        console.log(`Total subcategory limits in database: ${count}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateSubcategoryLimits();
