const mongoose = require('mongoose');

const distanceSchema = new mongoose.Schema({
  distanceInKm: {
    type: Number,
    required: true
  }
});

const Distance = mongoose.model('Distance', distanceSchema);

module.exports = Distance;

