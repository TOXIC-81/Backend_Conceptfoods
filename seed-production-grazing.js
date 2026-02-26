import mongoose from 'mongoose';

// Use your production MongoDB URI directly
const PRODUCTION_MONGO_URI = 'mongodb+srv://proconceptgourmetservices_db_user:UClDartbb2R6iNTr@cluster0.ojqyy7m.mongodb.net/conceptfoods?retryWrites=true&w=majority&appName=Cluster0';

const menuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  subcategory: String,
  isVegetarian: Boolean,
  isAvailable: Boolean,
  sortOrder: Number,
  price: Number,
  description: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

const grazingItems = [
  // Main items
  { name: 'Hummus Platter', category: 'grazing', subcategory: 'main', isVegetarian: true, isAvailable: true, sortOrder: 1, price: 0 },
  { name: 'Cheese Selection', category: 'grazing', subcategory: 'main', isVegetarian: true, isAvailable: true, sortOrder: 2, price: 0 },
  { name: 'Charcuterie Board', category: 'grazing', subcategory: 'main', isVegetarian: false, isAvailable: true, sortOrder: 3, price: 0 },
  { name: 'Mediterranean Mezze', category: 'grazing', subcategory: 'main', isVegetarian: true, isAvailable: true, sortOrder: 4, price: 0 },
  
  // Dips
  { name: 'Tzatziki Dip', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 1, price: 0 },
  { name: 'Baba Ganoush', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 2, price: 0 },
  { name: 'Spinach Artichoke Dip', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 3, price: 0 },
  { name: 'Roasted Red Pepper Dip', category: 'grazing', subcategory: 'dip', isVegetarian: true, isAvailable: true, sortOrder: 4, price: 0 },
  
  // Addons
  { name: 'Olives Mix', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 1, price: 0 },
  { name: 'Dried Fruits', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 2, price: 0 },
  { name: 'Fresh Berries', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 3, price: 0 },
  { name: 'Nuts Selection', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 4, price: 0 },
  { name: 'Honey Comb', category: 'grazing', subcategory: 'addon', isVegetarian: true, isAvailable: true, sortOrder: 5, price: 0 },
  
  // Bread
  { name: 'Artisan Crackers', category: 'grazing', subcategory: 'bread', isVegetarian: true, isAvailable: true, sortOrder: 1, price: 0 },
  { name: 'Sourdough Slices', category: 'grazing', subcategory: 'bread', isVegetarian: true, isAvailable: true, sortOrder: 2, price: 0 },
  { name: 'Pita Bread', category: 'grazing', subcategory: 'bread', isVegetarian: true, isAvailable: true, sortOrder: 3, price: 0 }
];

async function seedProductionGrazingItems() {
  try {
    console.log('Connecting to PRODUCTION database...');
    await mongoose.connect(PRODUCTION_MONGO_URI);
    console.log('✓ Connected to production MongoDB\n');
    
    // Check existing items
    const existingCount = await MenuItem.countDocuments({ category: 'grazing' });
    console.log(`Current grazing items in production: ${existingCount}`);
    
    if (existingCount > 0) {
      console.log('⚠️  Grazing items already exist. Clearing them first...');
      await MenuItem.deleteMany({ category: 'grazing' });
      console.log('✓ Cleared existing grazing items\n');
    }
    
    // Insert new items
    console.log(`Inserting ${grazingItems.length} grazing items...`);
    await MenuItem.insertMany(grazingItems);
    console.log(`✓ Successfully inserted ${grazingItems.length} grazing items\n`);
    
    // Verify
    const finalCount = await MenuItem.countDocuments({ category: 'grazing' });
    console.log(`Final count in production: ${finalCount} grazing items`);
    
    // Show breakdown
    const breakdown = await MenuItem.aggregate([
      { $match: { category: 'grazing' } },
      { $group: { _id: '$subcategory', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('\nBreakdown by subcategory:');
    breakdown.forEach(b => console.log(`  ${b._id}: ${b.count} items`));
    
    console.log('\n✅ Production database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding production data:', error);
    process.exit(1);
  }
}

seedProductionGrazingItems();
