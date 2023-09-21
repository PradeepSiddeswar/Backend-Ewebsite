// paymentRoutes.js
const express = require('express');
const router = express.Router();
const totalpaymentController = require('../Controller/TotalPayment_Controller');
 
// Create a new payment
router.post('/Payments', totalpaymentController.createPayment);

// Get total payments

router.get('/payments/total', totalpaymentController.getAllPayments);
router.get('/total-today', totalpaymentController.get);
router.put("/update/:id", totalpaymentController.update)
router.delete("/delete/:id", totalpaymentController.delete)
module.exports = router;
