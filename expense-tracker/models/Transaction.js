const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
currency: {
    type: String,
    required: true,
    uppercase: true,
    default: 'USD'
},
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
