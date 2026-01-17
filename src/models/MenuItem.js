import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    enum: ['cheese', 'bread', 'dip', 'fresh-fruit', 'dry-fruit', 'addon', 'curate-box-item', 'cheese-board'],
    required: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  ingredients: [{
    type: String
  }],
  isVegetarian: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('MenuItem', menuItemSchema);