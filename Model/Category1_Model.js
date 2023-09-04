const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: String,
  enterPrice: String,
  enterOffer: String,
  image: String,
  tagline: String
});

const category1Schema = new mongoose.Schema({
  name: String,
  // description: String,
  selecteCategory: String,
  // image: String, // Added description field
  offers: [offerSchema],
});

module.exports = mongoose.model('Category1', category1Schema);
