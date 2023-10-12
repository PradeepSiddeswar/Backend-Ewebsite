// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    HotelName: String,
    CustomerName: String,
    productName: String,
    quantity: Number,
    price: Number,
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
