import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    type: { type: String, enum: ["INCREASE", "DECREASE"], required: true },
    quantity: { type: Number, required: true, min: 1 },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
