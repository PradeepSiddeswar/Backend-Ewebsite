const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoUrl: String,
  name : String,
  Min :String
});

module.exports = mongoose.model('Video', videoSchema);

