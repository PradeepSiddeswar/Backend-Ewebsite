const mongoose = require('mongoose');

const totalpaymentSchema = new mongoose.Schema({
  customer_name: String,
  amount: Number,
  payment_date: Date,
  status: {
    type: String,
    enum: ['Paid', 'Failed', 'Completed'], // You can customize this as needed
    required: true,
  },
});

module.exports = mongoose.model('TotalPayment', totalpaymentSchema);