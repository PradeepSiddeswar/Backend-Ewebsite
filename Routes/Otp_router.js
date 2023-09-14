const express = require('express');
const router = express.Router();
const otpController = require('../Controller/Otp_Controller');

// Generate and send OTP
router.post('/generate', otpController.generateOTP);

// Verify OTP
router.put('/verify', otpController.verifyOTP);

module.exports = router;