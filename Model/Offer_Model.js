const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    enterPrice: String,
    enterOffer: String,
    tagline: String,
    profileImage2: String,
    profileImage3: String,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
