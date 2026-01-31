// Database Indexing Script for Optimal Performance
// Run this script to create indexes for better query performance

import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';

const createIndexes = async () => {
    try {
        console.log('Creating database indexes for optimal performance...');

        // Connect to MongoDB if not already connected
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        // Create compound indexes for common query patterns
        await MenuItem.collection.createIndex(
            { category: 1, isAvailable: 1, sortOrder: 1 },
            { name: 'category_available_sort_idx', background: true }
        );

        await MenuItem.collection.createIndex(
            { category: 1, subcategory: 1, sortOrder: 1 },
            { name: 'category_subcategory_sort_idx', background: true }
        );

        await MenuItem.collection.createIndex(
            { category: 1, sortOrder: 1, name: 1 },
            { name: 'category_sort_name_idx', background: true }
        );

        await MenuItem.collection.createIndex(
            { isAvailable: 1, sortOrder: 1 },
            { name: 'available_sort_idx', background: true }
        );

        await MenuItem.collection.createIndex(
            { createdAt: -1 },
            { name: 'created_desc_idx', background: true }
        );

        // Text index for search functionality
        await MenuItem.collection.createIndex(
            { name: 'text', description: 'text' },
            { name: 'text_search_idx', background: true }
        );

        console.log('Database indexes created successfully!');

        // List all indexes
        const indexes = await MenuItem.collection.listIndexes().toArray();
        console.log('Current indexes:');
        indexes.forEach(index => {
            console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
        });

    } catch (error) {
        console.error('Error creating indexes:', error);
    }
};

// Export for use in other scripts
export default createIndexes;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    createIndexes().then(() => {
        console.log('Index creation completed');
        process.exit(0);
    }).catch(error => {
        console.error('Index creation failed:', error);
        process.exit(1);
    });
}