const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid

const shippingOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: uuidv4(), // Automatically generate a unique Order ID using uuid
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Canceled'],
    default: 'Order Confirmed',
  },
  // Other fields in your schema
});

const ShippingOrder = mongoose.model('ShippingOrder', shippingOrderSchema);

module.exports = ShippingOrder;
