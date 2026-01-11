import mongoose from 'mongoose';
import CheeseBoard from '../src/models/CheeseBoard.js';
import dotenv from 'dotenv';

dotenv.config();

const cheeseBoards = [
  {
    type: "classic",
    name: "Classic Cheese Board",
    weight: "800gms",
    serves: "2-3",
    price: 2100,
    selections: {
      cheese: {
        choose: 1,
        options: [
          "Pickled Feta",
          "Parmesan Cheese",
          "English Cheddar",
          "Goat Cheese",
          "Bocconcini Cheese",
          "Herbs and Pepper Cheddar",
          "Chilly Hives Emmenthal Cheese",
          "Gouda Cheese",
          "Halloumi Cheese",
          "Roasted Garlic Feta",
          "Pepper Garlic Cheese",
          "Cheese Ball (Oregano, Parsley & Chilli Flakes)"
        ]
      },
      breads: {
        choose: 1,
        options: [
          "Focaccia Bread",
          "Millet Bread Slices",
          "Multigrain Bread",
          "Dinner Rolls",
          "Korean Cheese Bun",
          "Lavash",
          "Choco Marble Cake",
          "Sweet Buns",
          "Tea Cake Slices",
          "Banana Walnut Cake",
          "Garlic Bread",
          "Cheese Sticks",
          "Crackers"
        ]
      },
      dips: {
        choose: 1,
        options: [
          "Chilli Jam",
          "Guacamole",
          "Salsa",
          "Hummus",
          "Cheese & Jalapeno",
          "Basil and Walnut Pesto",
          "Pesto Sauce",
          "Chipotle Dip",
          "Strawberry Jam"
        ]
      },
      fruits: {
        fresh: 1,
        dry: 1,
        options: [
          "Grapes",
          "Apple",
          "Orange",
          "Green Kiwi",
          "Cashew Nuts",
          "Salted Nuts",
          "Pistachio",
          "Apricot and Figs",
          "Raisins and Almonds"
        ]
      },
      addOns: {
        choose: 1,
        options: [
          "Dark Chocolate",
          "Mixed Veg Batons",
          "Choco Chip Cookies",
          "Green Olives",
          "Choco Truffle Pastry",
          "Corn Flakes Cookies",
          "Apple Pie",
          "Cold Coffee",
          "Mini Brownies",
          "Mixed Crackers"
        ]
      }
    }
  },
  {
    type: "indian",
    name: "Indian Cheese Board",
    weight: "1000gms",
    serves: "4-6",
    price: 2500,
    selections: {
      cheese: { choose: 1, options: ["Pickled Feta","Parmesan Cheese","English Cheddar","Goat Cheese","Bocconcini Cheese","Herbs and Pepper Cheddar","Chilly Hives Emmenthal Cheese","Gouda Cheese","Halloumi Cheese","Roasted Garlic Feta","Pepper Garlic Cheese","Cheese Ball (Oregano, Parsley & Chilli Flakes)"] },
      breads: { choose: 1, options: ["Focaccia Bread","Millet Bread Slices","Multigrain Bread","Dinner Rolls","Korean Cheese Bun","Lavash","Choco Marble Cake","Sweet Buns","Tea Cake Slices","Banana Walnut Cake","Garlic Bread","Cheese Sticks","Crackers","Pav Buns","Mini Nan Bites","Khakra"] },
      dips: { choose: 1, options: ["Chilli Jam","Guacamole","Salsa","Pesto Sauce","Avvakai & Hung Curd","Bhajji (Pav Buns)","Hummus","Chipotle Dip","Strawberry Jam","Basil and Walnut Pesto"] },
      fruits: { fresh: 1, dry: 1, options: ["Grapes","Apple","Orange","Green Kiwi","Cashew Nuts","Salted Nuts","Pistachio","Apricot and Figs","Raisins and Almonds"] },
      addOns: { choose: 1, options: ["Dark Chocolate","Mixed Veg Batons","Choco Chip Cookies","Green Olives","Choco Truffle Pastry","Corn Flakes Cookies","Apple Pie","Cold Coffee","Mini Brownies","Mixed Crackers"] }
    }
  },
  {
    type: "silver",
    name: "Silver Cheese Board",
    weight: "1000gms",
    serves: "4-6",
    price: 3500,
    selections: {
      cheese: { choose: 2, options: ["Pickled Feta","Parmesan Cheese","English Cheddar","Goat Cheese","Bocconcini Cheese","Herbs and Pepper Cheddar","Chilly Hives Emmenthal Cheese","Gouda Cheese","Halloumi Cheese","Roasted Garlic Feta","Pepper Garlic Cheese","Cheese Ball (Oregano, Parsley & Chilli Flakes)"] },
      breads: { choose: 2, options: ["Focaccia Bread","Millet Bread Slices","Multigrain Bread","Dinner Rolls","Korean Cheese Bun","Lavash","Choco Marble Cake","Sweet Buns","Tea Cake Slices","Banana Walnut Cake","Garlic Bread","Cheese Sticks","Crackers"] },
      dips: { choose: 2, options: ["Chilli Jam","Guacamole","Salsa","Hummus","Cheese & Jalapeno","Basil and Walnut Pesto","Pesto Sauce","Chipotle Dip","Strawberry Jam"] },
      fruits: { fresh: 1, dry: 1, options: ["Grapes","Apple","Orange","Green Kiwi","Cashew Nuts","Salted Nuts","Pistachio","Apricot and Figs","Raisins and Almonds"] },
      addOns: { choose: 1, options: ["Dark Chocolate","Mixed Veg Batons","Choco Chip Cookies","Green Olives","Choco Truffle Pastry","Corn Flakes Cookies","Apple Pie","Cold Coffee","Mini Brownies","Mixed Crackers"] }
    }
  },
  {
    type: "gold",
    name: "Gold Cheese Board",
    weight: "1500gms",
    serves: "6-8",
    price: 5000,
    selections: {
      cheese: { choose: 2, options: ["Pickled Feta","Parmesan Cheese","English Cheddar","Goat Cheese","Bocconcini Cheese","Herbs and Pepper Cheddar","Chilly Hives Emmenthal Cheese","Gouda Cheese","Halloumi Cheese","Roasted Garlic Feta","Pepper Garlic Cheese","Cheese Ball (Oregano, Parsley & Chilli Flakes)"] },
      breads: { choose: 2, options: ["Focaccia Bread","Millet Bread Slices","Multigrain Bread","Dinner Rolls","Korean Cheese Bun","Lavash","Choco Marble Cake","Sweet Buns","Tea Cake Slices","Banana Walnut Cake","Garlic Bread","Cheese Sticks","Crackers"] },
      dips: { choose: 2, options: ["Chilli Jam","Guacamole","Salsa","Hummus","Cheese & Jalapeno","Basil and Walnut Pesto","Pesto Sauce","Chipotle Dip","Strawberry Jam"] },
      fruits: { fresh: 1, dry: 2, options: ["Grapes","Apple","Orange","Green Kiwi","Cashew Nuts","Salted Nuts","Pistachio","Apricot and Figs","Raisins and Almonds"] },
      addOns: { choose: 2, options: ["Dark Chocolate","Mixed Veg Batons","Choco Chip Cookies","Green Olives","Choco Truffle Pastry","Corn Flakes Cookies","Apple Pie","Cold Coffee","Mini Brownies","Mixed Crackers"] }
    }
  }
];

async function populateCheeseBoards() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await CheeseBoard.deleteMany({});
    console.log('Cleared existing cheese boards');

    await CheeseBoard.insertMany(cheeseBoards);
    console.log(`Successfully added ${cheeseBoards.length} cheese board configurations`);

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error populating cheese boards:', error);
    process.exit(1);
  }
}

populateCheeseBoards();