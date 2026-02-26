import mongoose from 'mongoose';

const cheeseBoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    limits: {
        cheese: Number,
        bread: Number,
        dip: Number,
        freshFruit: Number,
        dryFruit: Number,
        addon: Number
    },
    categories: [{
        name: {
            type: String,
            required: true
        },
        subtitle: String,
        maxSelections: {
            type: Number,
            default: 1
        },
        items: [{
            name: {
                type: String,
                required: true
            },
            description: String
        }]
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('CheeseBoard', cheeseBoardSchema);