import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  orderType: {
    type: String,
    required: true,
    enum: ['cheese-board', 'curate-box']
  },
  items: [{
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  }],
  cheeseBoard: {
    type: String,
    boardName: String,
    selections: mongoose.Schema.Types.Mixed
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: String
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);