import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../../controllers/orderController.js";
import protect from "../../middleware/authMiddleware.js";
import isAdmin from "../../middleware/adminMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createOrder); // Create an order
router.get("/my-orders", protect, getMyOrders); // Get logged-in user's orders

// Admin Routes
router.get("/", protect, isAdmin, getAllOrders); // Get all orders (admin only)

export default router;
