
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  enterPrice: String,
  enterOffer: String,
  image: String,
  tagline: String,
  image: String,

});

const category1Schema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Default shop Name',
  },
  image : {
    type: String,
    default: 'default.jpg',
  },
  locationInfo: String,
  selecteCategories: String,
  selectProduct: [{ type: String }], 
  offers: [offerSchema],
});

module.exports = mongoose.model('Category1', category1Schema);










