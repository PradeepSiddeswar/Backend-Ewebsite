// models/Product.js

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid


const ordersdetailsSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  totalitems: { // Use 'totalitems' instead of 'quantity'
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
});

const OrdersDetails = mongoose.model('OrdersDetails', ordersdetailsSchema);

module.exports = OrdersDetails;
