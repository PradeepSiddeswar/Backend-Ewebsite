const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  enterPrice: String,
  enterOffer: String,
  image2: String,
  tagline: String,
  image3: String,

});

const category1Schema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Default shop Name',
  },
  image1 : {
    type: String,
    default: 'default.jpg',
  },
  locationInfo: {
    type :String
  },
  selecteCategories: String,
  selectProduct: [{ type: String }], 
  offers: [offerSchema],
});

module.exports = mongoose.model('Category1', category1Schema);
