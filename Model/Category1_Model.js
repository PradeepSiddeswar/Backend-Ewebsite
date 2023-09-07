const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: String,
  enterPrice: String,
  enterOffer: String,
  tagline: String,
  image: String,

});

const category1Schema = new mongoose.Schema({
  name: String,
  selecteCategories: String,
  offers: [offerSchema],
});

module.exports = mongoose.model('Category1', category1Schema);
