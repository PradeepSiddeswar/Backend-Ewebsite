const Nexmo = require('nexmo');
const Textsms = require('../Model/Textsms_Model');

const apiUrl = 'https://rest.nexmo.com/sms/json';

// Initialize the Nexmo instance with your API key and secret
const nexmo = new Nexmo({
  apiKey: "c67a35ab",
  apiSecret: "DwK2004Orc40plrF",
});

// Fixed 'from' phone number
const from = 'Vonage APIs';

exports.create = async (req, res) => {
  // Get 'to' and 'text' values from the request body
  const { to, text } = req.body;

  // Check if 'to' and 'text' are provided
  if (!to || !text) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // 'to' can be a single phone number or an array of phone numbers
  // If you want to send to multiple recipients, you can pass an array of phone numbers in the 'to' field
  const toNumbers = Array.isArray(to) ? to : [to];

  // Loop through the recipients and send SMS to each one
  toNumbers.forEach((recipient) => {
    nexmo.message.sendSms(from, recipient, text, (err, responseData) => {
      if (err) {
        console.error('Error sending SMS to', recipient, ':', err);
        // Handle the error for this recipient (you can log it or take other actions)
      } else if (responseData) {
        // Check if responseData is not empty
        try {
          const parsedResponse = JSON.parse(responseData);
          // Handle the parsed response here (if needed)
          // For example, you can log the parsed response:
          console.log('Parsed API Response for', recipient, ':', parsedResponse);

          // Save the sent SMS message to the model
          Textsms.saveSms({
            to: recipient,
            text,
            messageId: parsedResponse.messages[0]['message-id'],
            timestamp: new Date().toISOString(),
          });

          // You can also send a response back to your client indicating success for this recipient
          // res.status(200).json({ message: 'SMS sent successfully to', recipient, responseData });
        } catch (parseError) {
          console.error('Error parsing API response for', recipient, ':', parseError);
          // Handle the parse error for this recipient (you can log it or take other actions)
        }
      } else {
        console.error('Empty API response for', recipient);
        // Handle the empty response for this recipient (you can log it or take other actions)
      }
    });
  });

  // Respond to your client with a success message or other appropriate response
  res.status(200).json({ message: 'SMS sent successfully to all recipients' });
};




exports.getSms = (req, res) => {
  // Retrieve all sent SMS messages from the model
  const smsMessages = Textsms.getAllSms();
  res.status(200).json(smsMessages);
};
