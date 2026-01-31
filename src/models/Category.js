import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['catering', 'grazing', 'boxes', 'cheese-boards'],
    required: true
  },
  maxSelections: {
    type: Number,
    default: 1,
    min: 0
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: 'fa-utensils'
  }
}, {
  timestamps: true
});

export default mongoose.model('Category', categorySchema);