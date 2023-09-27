const mongoose = require('mongoose');

// Define the TrackingMap schema
const trackingMapSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  }
  // Add other fields as needed
});

// Create a Mongoose model based on the schema
const TrackingMap = mongoose.model('TrackingMap', trackingMapSchema);

module.exports = TrackingMap;
