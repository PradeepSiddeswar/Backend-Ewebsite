const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,

  // Define the 'hotels' field as an array of references to the Hotel model
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  subcategory:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'subcategroy' }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
