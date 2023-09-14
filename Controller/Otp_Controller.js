const OTP = require('../Model/Otp_model')
const axios = require('axios');


exports.generateOTP = async (req, res) => {
    const { mobileNumber } = req.body;
  
    try {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Save the OTP in the database
      const otpRecord = await OTP.create({ mobileNumber, otp });
  
      // Construct the Fast2SMS API URL
      const apiKey = 'A13UCQzIB8uN6zCc8Ul6OjyMPfuhw2yToyqMGzuvz0g4BRQjjHDhtaMT9rY6';
      const message = `Your OTP for verification is: ${otp}`;
      const testUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&message=${message}&language=english&route=q&numbers=${mobileNumber}`;
  
      // Make the Axios GET request with a timeout of 5 seconds
      axios
        .get(testUrl, { timeout: 5000 }) // Set a timeout of 5 seconds
        .then((response) => {
          if (response.data.status === 'OK') {
            console.log('API Key is valid:', response.data);
            console.log('Fast2sms Response:', response.data);
          } else {
            console.error('API Key is invalid or request failed:', response.data);
          }
        })
        .catch((error) => {
         console.error('API Key is invalid or request failed:', error.message);
         console.error('Fast2sms Error:', error)
        });
  
      // Customize the response object
      const responseObj = {
        id: otpRecord._id,
        mobileNumber: otpRecord.mobileNumber,
        otp: otpRecord.otp,
        createdAt: otpRecord.createdAt,
      };
  
      // Send the customized response to the client
      res.status(200).json(responseObj);
    } catch (error) {
      console.error('Request failed:', error.message);
      // Handle the error (e.g., log, respond with an error message)
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  
  
  
  // Verify OTP
  exports.verifyOTP = async (req, res) => {
    const { mobileNumber, otp } = req.body;
  
    try {
      // Find the OTP record in the database
      const otpRecord = await OTP.findOne({ mobileNumber, otp });
  
      if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // OTP is valid
      // You can perform further actions here, such as marking the mobile number as verified
  
      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };