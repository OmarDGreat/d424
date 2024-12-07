import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../../controllers/orderController.js";
import protect from "../../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createOrder); // Create an order
router.get("/my-orders", protect, getMyOrders); // Get logged-in user's orders

router.get("/", protect, getAllOrders); 

export default router;
