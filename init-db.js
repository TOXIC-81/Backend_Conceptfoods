import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./src/models/Admin.js";
import MenuItem from "./src/models/MenuItem.js";

dotenv.config();

async function initializeDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create default admin user
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const admin = new Admin({
        username: "admin",
        email: "admin@conceptfoods.in",
        password: "admin123",
        role: "super-admin"
      });
      await admin.save();
      console.log("Default admin user created:");
      console.log("Username: admin");
      console.log("Password: admin123");
    } else {
      console.log("Admin user already exists");
    }

    // Create sample menu items
    const existingItems = await MenuItem.countDocuments();
    if (existingItems === 0) {
      const sampleItems = [
        {
          name: "Gourmet Sandwich Box",
          description: "Artisan sandwiches with premium ingredients, fresh salads, and seasonal fruits",
          price: 299,
          category: "curate-box",
          ingredients: ["Artisan bread", "Premium meats", "Fresh vegetables", "Gourmet cheese"],
          isVegetarian: false,
          isAvailable: true
        },
        {
          name: "Vegetarian Delight Box",
          description: "Fresh vegetarian options with quinoa salad, hummus, and seasonal vegetables",
          price: 249,
          category: "curate-box",
          ingredients: ["Quinoa", "Fresh vegetables", "Hummus", "Seasonal fruits"],
          isVegetarian: true,
          isAvailable: true
        },
        {
          name: "Classic Cheese Board",
          description: "Selection of artisan cheeses with crackers, nuts, and dried fruits",
          price: 599,
          category: "cheese-board",
          ingredients: ["Aged cheddar", "Brie", "Gouda", "Crackers", "Mixed nuts", "Dried fruits"],
          isVegetarian: true,
          isAvailable: true
        },
        {
          name: "Premium Cheese Platter",
          description: "Luxury cheese selection with wine pairings and gourmet accompaniments",
          price: 899,
          category: "cheese-board",
          ingredients: ["Imported cheeses", "Wine selection", "Gourmet crackers", "Honey", "Fresh grapes"],
          isVegetarian: true,
          isAvailable: true
        }
      ];

      await MenuItem.insertMany(sampleItems);
      console.log("Sample menu items created");
    } else {
      console.log("Menu items already exist");
    }

    console.log("Database initialization complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initializeDatabase();