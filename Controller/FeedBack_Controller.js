const Feedback = require('../Model/FeedBack_Model');

exports.create= async (req, res) => {
  const { feedback_text, star_rating } = req.body;

  try {
    const feedback = new Feedback({
      feedback_text,
      star_rating,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback received successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid feedback data' });
  }
};