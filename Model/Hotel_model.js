const mongoose = require('mongoose');

const categories1Schema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isVeg: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Categories1', categories1Schema);
