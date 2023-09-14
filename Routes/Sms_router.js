const express = require('express');
const router = express.Router();
const smscontroller = require('../Controller/Sms_Controller');

// Route to send OTP via SMS
router.post('/send-otp', smscontroller.sendOTPController);

// Add routes for OTP verification if needed

module.exports = router;
