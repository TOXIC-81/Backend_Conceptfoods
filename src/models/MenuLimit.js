import mongoose from 'mongoose';

const menuLimitSchema = new mongoose.Schema({
    menuType: {
        type: String,
        required: true,
        enum: ['catering', 'grazing']
    },
    menuVariant: {
        type: String,
        required: true
    },
    category: {
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
menuLimitSchema.index({ menuType: 1, menuVariant: 1, category: 1 }, { unique: true });

export default mongoose.model('MenuLimit', menuLimitSchema);