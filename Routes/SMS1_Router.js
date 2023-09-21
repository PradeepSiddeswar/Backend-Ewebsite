const express = require('express');
const router = express.Router();
const sms1controller = require('../Controller/SMS1_Controller');

// Route to send OTP via SMS
router.post('/', sms1controller.sendSMS);

// Add routes for OTP verification if needed

module.exports = router;