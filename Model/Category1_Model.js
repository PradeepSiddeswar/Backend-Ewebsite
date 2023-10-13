
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
  image : {
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
// const Offer = require('./Offer_Model')
// const mongoose = require('mongoose');

// const category1Schema = new mongoose.Schema({
//     name: String,
//     image1: String,
//     locationInfo: String,
//     selecteCategories: String,
//     selectProduct: [String],
//     offers: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Offer', // Reference the 'Offer' model
//         }
//     ],
// });

// const Category1 = mongoose.model('Category1', category1Schema);

// module.exports = Category1;









