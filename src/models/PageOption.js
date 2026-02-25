import mongoose from 'mongoose';

const pageOptionSchema = new mongoose.Schema({
  page: {
    type: String,
    enum: ['catering', 'grazing', 'cheese-boards'],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    default: 0
  },
  image: String,
  limits: {
    type: Map,
    of: Number
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

pageOptionSchema.index({ page: 1, name: 1 }, { unique: true });

export default mongoose.model('PageOption', pageOptionSchema);
