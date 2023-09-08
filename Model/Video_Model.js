const mongoose = require('mongoose');

const youtubSchema = new mongoose.Schema({
  videoUrl: String,
});

const videoSchema = new mongoose.Schema({
  Youtubvideo: [youtubSchema],
});

module.exports = mongoose.model('Video', videoSchema);
