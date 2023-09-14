const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
  mobileNumber: String,
  otp: String,
  createdAt: { type: Date, default: Date.now },
});

const SMS = mongoose.model('SMS', smsSchema);

module.exports = SMS;
