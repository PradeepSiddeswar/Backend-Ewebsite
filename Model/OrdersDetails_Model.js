// models/Product.js

const mongoose = require('mongoose');

const ordersdetailsSchema = new mongoose.Schema({
    image: {
        type: String, 
        required: true,
      },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
 
});

const OrdersDetails = mongoose.model('OrdersDetails', ordersdetailsSchema);

module.exports = OrdersDetails;
