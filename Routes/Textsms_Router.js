const express = require('express');
const router = express.Router();
const TextsmsController = require('../Controller/Textsms_Controller');

// Route to send OTP via SMS
router.post('/', TextsmsController.create);
router.get('/getsms', TextsmsController.getSms)
// Add routes for OTP verification if needed

module.exports = router;