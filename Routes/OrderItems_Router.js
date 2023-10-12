const express = require('express');
const router = express.Router();
const orderitemsController = require('../Controller/OrdersItems._Controller');

// Create a new order
router.post('/', orderitemsController.createOrder);

// Get total orders placed today
router.get('/total-orders-today', orderitemsController.getTotalOrdersToday);
router.delete("/delete/:id", orderitemsController.delete)

module.exports = router;