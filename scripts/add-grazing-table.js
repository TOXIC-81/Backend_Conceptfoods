import mongoose from 'mongoose';
import MenuLimit from '../src/models/MenuLimit.js';
import dotenv from 'dotenv';

dotenv.config();

const grazingTableLimits = [
  { menuType: 'grazing', menuVariant: 'grazing-table', category: 'cheese', limit: 5, price: 5000 },
  { menuType: 'grazing', menuVariant: 'grazing-table', category: 'bread', limit: 3, price: 5000 },
  { menuType: 'grazing', menuVariant: 'grazing-table', category: 'dip', limit: 3, price: 5000 },
  { menuType: 'grazing', menuVariant: 'grazing-table', category: 'fresh-fruit', limit: 2, price: 5000 },
  { menuType: 'grazing', menuVariant: 'grazing-table', category: 'dry-fruit', limit: 2, price: 5000 },
  { menuType: 'grazing', menuVariant: 'grazing-table', category: 'addon', limit: 3, price: 5000 }
];

async function addGrazingTable() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    for (const limit of grazingTableLimits) {
      await MenuLimit.updateOne(
        { menuType: limit.menuType, menuVariant: limit.menuVariant, category: limit.category },
        limit,
        { upsert: true }
      );
    }
    
    console.log('Grazing table limits added successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addGrazingTable();
