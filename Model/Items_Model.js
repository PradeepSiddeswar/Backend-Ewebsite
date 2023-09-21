const mongoose = require('mongoose');

// Define the schema for the Item model
const itemSchema = new mongoose.Schema({
  itemName: {
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
  // You can add more fields as needed for your use case
  // For example, you might want to include a date field for the purchase date.
});

// Create the Item model based on the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
