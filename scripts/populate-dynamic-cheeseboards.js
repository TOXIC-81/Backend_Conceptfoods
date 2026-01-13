import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CheeseBoard from '../src/models/CheeseBoard.js';

dotenv.config();

const sampleCheeseBoards = [
    {
        name: "Classic Cheese Board",
        price: 1200,
        description: "A traditional selection of premium cheeses",
        categories: [
            {
                name: "Cheese Selection",
                subtitle: "Choose Any 3",
                maxSelections: 3,
                items: [
                    { name: "Aged Cheddar", description: "Sharp and tangy" },
                    { name: "Brie", description: "Creamy and mild" },
                    { name: "Gouda", description: "Nutty and sweet" },
                    { name: "Blue Cheese", description: "Bold and pungent" },
                    { name: "Camembert", description: "Rich and buttery" }
                ]
            },
            {
                name: "Crackers",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Water Crackers" },
                    { name: "Multigrain Crackers" },
                    { name: "Rosemary Crackers" },
                    { name: "Oat Cakes" }
                ]
            },
            {
                name: "Accompaniments",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Fig Jam" },
                    { name: "Honey" },
                    { name: "Mixed Nuts" },
                    { name: "Grapes" },
                    { name: "Dried Fruits" }
                ]
            }
        ]
    },
    {
        name: "Gourmet Cheese Platter",
        price: 1800,
        description: "Premium artisanal cheese selection",
        categories: [
            {
                name: "Premium Cheeses",
                subtitle: "Choose Any 4",
                maxSelections: 4,
                items: [
                    { name: "Truffle Brie", description: "Luxurious truffle-infused" },
                    { name: "Aged Manchego", description: "Spanish sheep's milk cheese" },
                    { name: "Roquefort", description: "French blue cheese" },
                    { name: "Gruyère", description: "Swiss alpine cheese" },
                    { name: "Pecorino Romano", description: "Italian hard cheese" },
                    { name: "Stilton", description: "English blue cheese" }
                ]
            },
            {
                name: "Artisan Crackers",
                subtitle: "Choose Any 3",
                maxSelections: 3,
                items: [
                    { name: "Lavosh Crackers" },
                    { name: "Seed Crackers" },
                    { name: "Herb Crackers" },
                    { name: "Sourdough Crisps" },
                    { name: "Parmesan Crisps" }
                ]
            },
            {
                name: "Gourmet Accompaniments",
                subtitle: "Choose Any 3",
                maxSelections: 3,
                items: [
                    { name: "Quince Paste" },
                    { name: "Truffle Honey" },
                    { name: "Candied Walnuts" },
                    { name: "Fresh Berries" },
                    { name: "Cornichons" },
                    { name: "Charcuterie Selection" }
                ]
            }
        ]
    }
];

async function populateCheeseBoards() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing cheese boards
        await CheeseBoard.deleteMany({});
        console.log('Cleared existing cheese boards');

        // Insert sample data
        const result = await CheeseBoard.insertMany(sampleCheeseBoards);
        console.log(`Inserted ${result.length} cheese boards`);

        console.log('Sample cheese boards created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

populateCheeseBoards();