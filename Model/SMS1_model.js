const mongoose = require('mongoose');

// Define the SMS schema
const sms1Schema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an SMS model based on the schema
const SMS1 = mongoose.model('SMS1', sms1Schema);

module.exports = SMS1;
