// models/OTP.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTPs expire after 5 minutes (adjust as needed)
  },
});

module.exports = mongoose.model('OTP', otpSchema);


// const mongoose = require("mongoose")
// const schema = mongoose.Schema

// const otpSchema = new schema({
//     number: {
//         type: Number
//     },
//     otp: {
//         type: String
//     },
//     status: {
//         type: String,
//         default: "not verified",
//         enum: ["verified", "not verified"]
//     }
// })


// const otpDb = mongoose.model("OTP", otpSchema)
// module.exports = otpDb