const mongoose = require('mongoose');

const formLocationSchema = new mongoose.Schema({
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  image: String,
  EnterName: String,
  EnterPrice: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: String,
  hotels: [
    {
      hotelName: String,
      distance: Number,
      image: String,
      isVeg: Boolean,
      isNonVeg: Boolean
    }
  ]
});

const FormLocation = mongoose.model('FormLocation', formLocationSchema);

module.exports = FormLocation;
