import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CheeseBoard from '../src/models/CheeseBoard.js';

dotenv.config();

const actualCheeseBoards = [
    {
        name: "Classic Cheese Board",
        price: 2100,
        description: "800gms, Serves 2-3",
        categories: [
            {
                name: "Cheese Selection",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Pickled Feta" },
                    { name: "Parmesan Cheese" },
                    { name: "English Cheddar" },
                    { name: "Goat Cheese" },
                    { name: "Bocconcini Cheese" },
                    { name: "Herbs and Pepper" },
                    { name: "Cheddar Chilly Hives" },
                    { name: "Emmenthal Cheese" },
                    { name: "Gouda Cheese" },
                    { name: "Halloumi Cheese" },
                    { name: "Roasted Garlic Feta" },
                    { name: "Pepper Garlic Cheese" },
                    { name: "Cheese Ball (Oregano, Parsley & Chilli Flakes)" }
                ]
            },
            {
                name: "Breads & Crisps",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Focaccia Bread" },
                    { name: "Millet Bread Slices" },
                    { name: "Multigrain Bread" },
                    { name: "Dinner Rolls" },
                    { name: "Korean Cheese Bun" },
                    { name: "Lavash" },
                    { name: "Choco Marble Cake" },
                    { name: "Sweet Buns" },
                    { name: "Tea Cake Slices" },
                    { name: "Banana Walnut Cake" },
                    { name: "Garlic Bread" },
                    { name: "Cheese Sticks" },
                    { name: "Crackers" }
                ]
            },
            {
                name: "Dips",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Chilli Jam" },
                    { name: "Guacamole" },
                    { name: "Salsa" },
                    { name: "Hummus" },
                    { name: "Cheese & Jalapeno" },
                    { name: "Basil and Walnut Pesto" },
                    { name: "Pesto Sauce" },
                    { name: "Chipotle Dip" },
                    { name: "Strawberry Jam" }
                ]
            },
            {
                name: "Fresh Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Grapes" },
                    { name: "Apple" },
                    { name: "Orange" },
                    { name: "Green Kiwi" }
                ]
            },
            {
                name: "Dry Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Cashew Nuts" },
                    { name: "Salted Nuts" },
                    { name: "Pistachio" },
                    { name: "Apricot and Figs" },
                    { name: "Raisins and Almonds" }
                ]
            },
            {
                name: "Add Ons",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Dark Chocolate" },
                    { name: "Mixed Veg Batons" },
                    { name: "Choco Chip Cookies" },
                    { name: "Green Olives" },
                    { name: "Choco Truffle Pastry" },
                    { name: "Corn Flakes Cookies" },
                    { name: "Apple Pie" },
                    { name: "Cold Coffee" },
                    { name: "Mini Brownies" },
                    { name: "Mixed Crackers" }
                ]
            }
        ]
    },
    {
        name: "Silver Cheese Board",
        price: 3500,
        description: "1000gms, Serves 4-6",
        categories: [
            {
                name: "Cheese Selection",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Pickled Feta" },
                    { name: "Parmesan Cheese" },
                    { name: "English Cheddar" },
                    { name: "Goat Cheese" },
                    { name: "Bocconcini Cheese" },
                    { name: "Herbs and Pepper" },
                    { name: "Cheddar Chilly Hives" },
                    { name: "Emmenthal Cheese" },
                    { name: "Gouda Cheese" },
                    { name: "Halloumi Cheese" },
                    { name: "Roasted Garlic Feta" },
                    { name: "Pepper Garlic Cheese" },
                    { name: "Cheese Ball (Oregano, Parsley & Chilli Flakes)" }
                ]
            },
            {
                name: "Breads & Crisps",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Focaccia Bread" },
                    { name: "Millet Bread Slices" },
                    { name: "Multigrain Bread" },
                    { name: "Dinner Rolls" },
                    { name: "Korean Cheese Bun" },
                    { name: "Lavash" },
                    { name: "Choco Marble Cake" },
                    { name: "Sweet Buns" },
                    { name: "Tea Cake Slices" },
                    { name: "Banana Walnut Cake" },
                    { name: "Garlic Bread" },
                    { name: "Cheese Sticks" },
                    { name: "Crackers" }
                ]
            },
            {
                name: "Dips",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Chilli Jam" },
                    { name: "Guacamole" },
                    { name: "Salsa" },
                    { name: "Hummus" },
                    { name: "Cheese & Jalapeno" },
                    { name: "Basil and Walnut Pesto" },
                    { name: "Pesto Sauce" },
                    { name: "Chipotle Dip" },
                    { name: "Strawberry Jam" }
                ]
            },
            {
                name: "Fresh Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Grapes" },
                    { name: "Apple" },
                    { name: "Orange" },
                    { name: "Green Kiwi" }
                ]
            },
            {
                name: "Dry Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Cashew Nuts" },
                    { name: "Salted Nuts" },
                    { name: "Pistachio" },
                    { name: "Apricot and Figs" },
                    { name: "Raisins and Almonds" }
                ]
            },
            {
                name: "Add Ons",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Dark Chocolate" },
                    { name: "Mixed Veg Batons" },
                    { name: "Choco Chip Cookies" },
                    { name: "Green Olives" },
                    { name: "Choco Truffle Pastry" },
                    { name: "Corn Flakes Cookies" },
                    { name: "Apple Pie" },
                    { name: "Cold Coffee" },
                    { name: "Mini Brownies" },
                    { name: "Mixed Crackers" }
                ]
            }
        ]
    },
    {
        name: "Gold Cheese Board",
        price: 5000,
        description: "1500gms, Serves 6-8",
        categories: [
            {
                name: "Cheese Selection",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Pickled Feta" },
                    { name: "Parmesan Cheese" },
                    { name: "English Cheddar" },
                    { name: "Goat Cheese" },
                    { name: "Bocconcini Cheese" },
                    { name: "Herbs and Pepper" },
                    { name: "Cheddar Chilly Hives" },
                    { name: "Emmenthal Cheese" },
                    { name: "Gouda Cheese" },
                    { name: "Halloumi Cheese" },
                    { name: "Roasted Garlic Feta" },
                    { name: "Pepper Garlic Cheese" },
                    { name: "Cheese Ball (Oregano, Parsley & Chilli Flakes)" }
                ]
            },
            {
                name: "Breads & Crisps",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Focaccia Bread" },
                    { name: "Millet Bread Slices" },
                    { name: "Multigrain Bread" },
                    { name: "Dinner Rolls" },
                    { name: "Korean Cheese Bun" },
                    { name: "Lavash" },
                    { name: "Choco Marble Cake" },
                    { name: "Sweet Buns" },
                    { name: "Tea Cake Slices" },
                    { name: "Banana Walnut Cake" },
                    { name: "Garlic Bread" },
                    { name: "Cheese Sticks" },
                    { name: "Crackers" }
                ]
            },
            {
                name: "Dips",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Chilli Jam" },
                    { name: "Guacamole" },
                    { name: "Salsa" },
                    { name: "Hummus" },
                    { name: "Cheese & Jalapeno" },
                    { name: "Basil and Walnut Pesto" },
                    { name: "Pesto Sauce" },
                    { name: "Chipotle Dip" },
                    { name: "Strawberry Jam" }
                ]
            },
            {
                name: "Fresh Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Grapes" },
                    { name: "Apple" },
                    { name: "Orange" },
                    { name: "Green Kiwi" }
                ]
            },
            {
                name: "Dry Fruits",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Cashew Nuts" },
                    { name: "Salted Nuts" },
                    { name: "Pistachio" },
                    { name: "Apricot and Figs" },
                    { name: "Raisins and Almonds" }
                ]
            },
            {
                name: "Add Ons",
                subtitle: "Choose Any 2",
                maxSelections: 2,
                items: [
                    { name: "Dark Chocolate" },
                    { name: "Mixed Veg Batons" },
                    { name: "Choco Chip Cookies" },
                    { name: "Green Olives" },
                    { name: "Choco Truffle Pastry" },
                    { name: "Corn Flakes Cookies" },
                    { name: "Apple Pie" },
                    { name: "Cold Coffee" },
                    { name: "Mini Brownies" },
                    { name: "Mixed Crackers" }
                ]
            }
        ]
    },
    {
        name: "Indian Cheese Board",
        price: 2500,
        description: "1000gms, Serves 4-6",
        categories: [
            {
                name: "Cheese Selection",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Pickled Feta" },
                    { name: "Parmesan Cheese" },
                    { name: "English Cheddar" },
                    { name: "Goat Cheese" },
                    { name: "Bocconcini Cheese" },
                    { name: "Herbs and Pepper" },
                    { name: "Cheddar Chilly Hives" },
                    { name: "Emmenthal Cheese" },
                    { name: "Gouda Cheese" },
                    { name: "Halloumi Cheese" },
                    { name: "Roasted Garlic Feta" },
                    { name: "Pepper Garlic Cheese" },
                    { name: "Cheese Ball (Oregano, Parsley & Chilli Flakes)" }
                ]
            },
            {
                name: "Breads & Crisps",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Focaccia Bread" },
                    { name: "Millet Bread Slices" },
                    { name: "Multigrain Bread" },
                    { name: "Dinner Rolls" },
                    { name: "Korean Cheese Bun" },
                    { name: "Lavash" },
                    { name: "Choco Marble Cake" },
                    { name: "Pav Buns" },
                    { name: "Sweet Buns" },
                    { name: "Tea Cake Slices" },
                    { name: "Banana Walnut Cake" },
                    { name: "Mini Nan Bites" },
                    { name: "Garlic Bread" },
                    { name: "Cheese Sticks" },
                    { name: "Crackers" },
                    { name: "Khakra" }
                ]
            },
            {
                name: "Dips",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Chilli Jam" },
                    { name: "Guacamole" },
                    { name: "Salsa" },
                    { name: "Pesto Sauce" },
                    { name: "Avvakai & Hung Curd" },
                    { name: "Cheese & Jalapeno" },
                    { name: "Basil and Walnut Pesto" },
                    { name: "Bhajji (Pav Buns)" },
                    { name: "Hummus" },
                    { name: "Chipotle Dip" },
                    { name: "Strawberry Jam" }
                ]
            },
            {
                name: "Fresh Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Grapes" },
                    { name: "Apple" },
                    { name: "Orange" },
                    { name: "Green Kiwi" }
                ]
            },
            {
                name: "Dry Fruits",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Cashew Nuts" },
                    { name: "Salted Nuts" },
                    { name: "Pistachio" },
                    { name: "Apricot and Figs" },
                    { name: "Raisins and Almonds" }
                ]
            },
            {
                name: "Add Ons",
                subtitle: "Choose Any 1",
                maxSelections: 1,
                items: [
                    { name: "Dark Chocolate" },
                    { name: "Mixed Veg Batons" },
                    { name: "Choco Chip Cookies" },
                    { name: "Green Olives" },
                    { name: "Choco Truffle Pastry" },
                    { name: "Corn Flakes Cookies" },
                    { name: "Apple Pie" },
                    { name: "Cold Coffee" },
                    { name: "Mini Brownies" },
                    { name: "Mixed Crackers" }
                ]
            }
        ]
    }
];

async function populateActualCheeseBoards() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await CheeseBoard.deleteMany({});
        console.log('Cleared existing cheese boards');

        const result = await CheeseBoard.insertMany(actualCheeseBoards);
        console.log(`Inserted ${result.length} cheese boards`);

        console.log('Actual cheese boards created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

populateActualCheeseBoards();