const mongoose = require('mongoose');

// Define the product schema
const carttotalSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // Assuming the image is stored as a URL (string)
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalitems: {
        type: Number,
        required: true,
    },
    offer: {
        type: Number,
        required: true,
    },
});

// Create a Product model
const CartTotal = mongoose.model('CartTotal', carttotalSchema);

module.exports = CartTotal;
