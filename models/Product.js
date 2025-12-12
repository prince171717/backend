import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

productSchema.index({ sku: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
