import express, { Router } from "express";
import {  createProduct,
  increaseStock,
  decreaseStock,
  getProductSummary,
  getTransactions } from "../controllers/productsController.js";

const router = Router();

router.post("/", createProduct);
router.post("/:id/increase", increaseStock);
router.post("/:id/decrease", decreaseStock);
router.get("/:id", getProductSummary);
router.get("/:id/transactions", getTransactions);

export default router;
