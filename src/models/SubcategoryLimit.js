import mongoose from 'mongoose';

const subcategoryLimitSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        enum: ['catering', 'grazing', 'cheese-boards']
    },
    pageVariant: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
subcategoryLimitSchema.index({ page: 1, pageVariant: 1, subcategory: 1 }, { unique: true });

export default mongoose.model('SubcategoryLimit', subcategoryLimitSchema);
