const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
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
  },
  isNonVeg: {
    type: Boolean,
    required: true
  }
});
const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;
