const twilio = require('twilio');
const SMS1 = require('../Model/SMS1_model'); // Import your SMS model

// Initialize Twilio client with your credentials
const twilioClient = twilio('ACe7095109a4c0dd3313b18eade9848c90', 'b6093b85d1bcc609288b18adf5c44250');

// Controller function to send SMS
exports.sendSMS = async (req, res) => {
  try {
    const { to, message } = req.body;

    // Send the SMS message using Twilio
    await twilioClient.messages.create({
      body: message,
      from: '+14787072973', // Your Twilio phone number
      to, // Recipient's phone number
    });

    // Save the sent SMS to the database
    const sentSMS = new SMS1({ to, message });
    await sentSMS.save();

    res.status(200).json({ message: 'SMS sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send SMS', error: error.message });
  }
}

