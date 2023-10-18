const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback_text: {
    type: String,
    required: true,
  },
  star_rating: {
    type: Number,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
