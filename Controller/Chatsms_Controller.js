const Message = require('../Model/Chatsms_Model');

// Create a new chat message
exports.createMessage = async (req, res) => {
  try {
    const { text, user } = req.body;
    const message = new Message({ text, user });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all chat messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
