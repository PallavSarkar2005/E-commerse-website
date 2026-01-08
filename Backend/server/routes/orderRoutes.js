import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// Route: /api/orders
router.route('/').post(protect, addOrderItems);

// Route: /api/orders/myorders
router.route('/myorders').get(protect, getMyOrders);

// Route: /api/orders/:id
router.route('/:id').get(protect, getOrderById);

// Route: /api/orders/:id/pay
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;