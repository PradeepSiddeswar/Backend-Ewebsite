const twilio = require('twilio');
const SMS = require('../Model/Sms_model');

const twilioClient = twilio('ACe7095109a4c0dd3313b18eade9848c90', '5969e97035f3a432dcaeaadbcddd5449');

// Function to send OTP via Twilio
async function sendOTP(mobileNumber, otp) {
  try {
    // Send the OTP via SMS using Twilio
    await twilioClient.messages.create({
      body: `Your OTP for verification is: ${otp}`,
      from: '+14787072973',
      to: mobileNumber,
    });
    return true; // SMS sent successfully
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false; // SMS sending failed
  }
}

// Controller function to send OTP
exports.sendOTPController = async (req, res) => {
  const { mobileNumber } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Save OTP in the database (you need to create the OTP model for this)
    const otpRecord = new SMS({ mobileNumber, otp });
    await otpRecord.save();

    // Send OTP via SMS
    const smsSent = await sendOTP(mobileNumber, otp);

    if (smsSent) {
      res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}