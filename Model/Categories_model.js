const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;



