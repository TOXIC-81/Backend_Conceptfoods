import mongoose from 'mongoose';
import CheeseBoard from '../src/models/CheeseBoard.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkGrazingTable() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const table = await CheeseBoard.findOne({ type: 'grazing-table' });
    console.log('Grazing Table:', JSON.stringify(table, null, 2));
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkGrazingTable();
