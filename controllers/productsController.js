import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";

// Create Product
export const createProduct = async (req, res, next) => {
  try {
    const { name, sku, initialStock } = req.body;

    if (initialStock < 0)
      return res.status(400).json({ message: "initialStock must be ≥ 0" });

    const product = await Product.create({
      name,
      sku,
      stock: initialStock
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Increase Stock
export const increaseStock = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (quantity <= 0)
      return res.status(400).json({ message: "Quantity must be > 0" });

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.stock += quantity;
    await product.save();

    await Transaction.create({
      productId: product._id,
      type: "INCREASE",
      quantity
    });

    res.json({ message: "Stock increased", stock: product.stock });
  } catch (err) {
    next(err);
  }
};

// Decrease Stock
export const decreaseStock = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (quantity <= 0)
      return res.status(400).json({ message: "Quantity must be > 0" });

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.stock - quantity < 0)
      return res.status(400).json({ message: "Insufficient stock" });

    product.stock -= quantity;
    await product.save();

    await Transaction.create({
      productId: product._id,
      type: "DECREASE",
      quantity
    });

    res.json({ message: "Stock decreased", stock: product.stock });
  } catch (err) {
    next(err);
  }
};

// Product Summary
export const getProductSummary = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const increases = await Transaction.aggregate([
      { $match: { productId: product._id, type: "INCREASE" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    const decreases = await Transaction.aggregate([
      { $match: { productId: product._id, type: "DECREASE" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    res.json({
      product,
      currentStock: product.stock,
      totalIncreased: increases[0]?.total || 0,
      totalDecreased: decreases[0]?.total || 0
    });
  } catch (err) {
    next(err);
  }
};

// Transaction History
export const getTransactions = async (req, res, next) => {
  try {
    const txns = await Transaction.find({ productId: req.params.id }).sort({
      timestamp: -1
    });

    res.json(txns);
  } catch (err) {
    next(err);
  }
};
