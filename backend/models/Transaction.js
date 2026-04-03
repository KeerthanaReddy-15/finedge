import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'transfer_out', 'transfer_in', 'trade_crypto_buy', 'trade_crypto_sell', 'trade_stock_buy', 'trade_stock_sell', 'escrow_claim', 'trade_buy', 'trade_sell'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'completed',
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
