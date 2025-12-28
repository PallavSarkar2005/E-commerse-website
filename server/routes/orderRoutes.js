const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Route: /api/orders
router.route('/').post(protect, addOrderItems);

// Route: /api/orders/myorders
router.route('/myorders').get(protect, getMyOrders);

// Route: /api/orders/:id
router.route('/:id').get(protect, getOrderById);

// Route: /api/orders/:id/pay
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;