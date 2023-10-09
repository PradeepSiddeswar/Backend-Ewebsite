const mongoose = require('mongoose');

const paymentInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (if you have one)
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Cash on Delivery'],
    required: true,
  },
  userLocation: {
   type: String
  },
  // You can add more fields for payment details (e.g., credit card number, PayPal email, etc.) here.
});

const PaymentInfo = mongoose.model('PaymentInfo', paymentInfoSchema);

module.exports = PaymentInfo;
