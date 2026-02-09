import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CheeseBoard from '../src/models/CheeseBoard.js';

dotenv.config();

const defaultBoards = [
    {
        name: 'Classic Cheese Board',
        type: 'classic',
        price: 2100,
        description: '800gms • Serves 2-3',
        categories: [
            { name: 'Cheese Selection', items: [] },
            { name: 'Breads & Crisps', items: [] },
            { name: 'Dips', items: [] },
            { name: 'Fresh Fruits', items: [] },
            { name: 'Dry Fruits', items: [] },
            { name: 'Add Ons', items: [] }
        ],
        isActive: true
    },
    {
        name: 'Indian Cheese Board',
        type: 'indian',
        price: 2500,
        description: '1000gms • Serves 4-6',
        categories: [
            { name: 'Cheese Selection', items: [] },
            { name: 'Breads & Crisps', items: [] },
            { name: 'Dips', items: [] },
            { name: 'Fresh Fruits', items: [] },
            { name: 'Dry Fruits', items: [] },
            { name: 'Add Ons', items: [] }
        ],
        isActive: true
    },
    {
        name: 'Silver Cheese Board',
        type: 'silver',
        price: 3500,
        description: '1000gms • Serves 4-6',
        categories: [
            { name: 'Cheese Selection', items: [] },
            { name: 'Breads & Crisps', items: [] },
            { name: 'Dips', items: [] },
            { name: 'Fresh Fruits', items: [] },
            { name: 'Dry Fruits', items: [] },
            { name: 'Add Ons', items: [] }
        ],
        isActive: true
    },
    {
        name: 'Gold Cheese Board',
        type: 'gold',
        price: 5000,
        description: '1500gms • Serves 6-8',
        categories: [
            { name: 'Cheese Selection', items: [] },
            { name: 'Breads & Crisps', items: [] },
            { name: 'Dips', items: [] },
            { name: 'Fresh Fruits', items: [] },
            { name: 'Dry Fruits', items: [] },
            { name: 'Add Ons', items: [] }
        ],
        isActive: true
    }
];

async function createCheeseBoards() {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MongoDB URI not found in environment variables');
        }
        
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
        
        // Clear existing cheese boards
        await CheeseBoard.deleteMany({});
        console.log('Cleared existing cheese boards');
        
        // Insert default boards
        await CheeseBoard.insertMany(defaultBoards);
        console.log(`Created ${defaultBoards.length} cheese boards`);
        
        // Verify
        const count = await CheeseBoard.countDocuments();
        console.log(`Total cheese boards in database: ${count}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

createCheeseBoards();
