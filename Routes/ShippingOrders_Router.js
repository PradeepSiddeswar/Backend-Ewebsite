const express = require('express');
const router = express.Router();
const shippingOrdersController = require('../Controller/ShippingOrders_Controller');

// Define routes for creating a new shipping order
router.post('/', shippingOrdersController.createShippingOrder);
router.get('/location/:orderId', shippingOrdersController.getLocationByOrderId);

module.exports = router;
