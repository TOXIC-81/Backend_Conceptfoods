import mongoose from 'mongoose';

const cheeseBoardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['classic', 'indian', 'silver', 'gold']
  },
  name: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  serves: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  selections: {
    cheese: {
      choose: Number,
      options: [String]
    },
    breads: {
      choose: Number,
      options: [String]
    },
    dips: {
      choose: Number,
      options: [String]
    },
    fruits: {
      fresh: Number,
      dry: Number,
      options: [String]
    },
    addOns: {
      choose: Number,
      options: [String]
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('CheeseBoard', cheeseBoardSchema);