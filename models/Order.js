import mongoose from 'mongoose';

const {ObjectId, String, Number} = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
  user:{
    type: ObjectId,
    ref: 'User' // User model
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: ObjectId,
        ref: 'Product' // Product model
      }
    }
  ],
  email: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
  }, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);