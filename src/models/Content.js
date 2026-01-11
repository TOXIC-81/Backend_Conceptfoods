import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['service-title', 'service-description', 'service-feature', 'testimonial-text', 'testimonial-author', 'testimonial-role', 'section-title', 'section-subtitle']
  },
  index: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique type-index combinations
contentSchema.index({ type: 1, index: 1 }, { unique: true });

export default mongoose.model('Content', contentSchema);