const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  enterPrice: String,
  enterOffer: String,
  Image: String,
  tagline: String,
  image: String,

});

const category1Schema = new mongoose.Schema({
  name: String,
  selecteCategories: String,
  selectProduct: [{ type: String }], 
  offers: [offerSchema],
});

module.exports = mongoose.model('Category1', category1Schema);
