const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  subcategroy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' }]


});

const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;
