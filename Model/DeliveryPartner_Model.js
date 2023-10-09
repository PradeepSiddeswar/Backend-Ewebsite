const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ShopListing: {
    type: [String],
    required: true
  },
  
  FullName: {
    type: String,
    required: true,
  },

  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  ContctNumber :{
    type: Number,
    required: true
  },
  CurrentAddres : {
    type: String,
    required: true
  },
  AadhaarCardNumber : {
    type: Number,
    required: true
  },
  PanCardNumber : {
    type: String,
    required: true
  },
  VehicleInsuranceDetails : {
    type: String,
    required: true
  },
  VehicleName : {
    type: String,
    required: true
  },
  VehicleRegistrationNumber : {
    type: String,
    required: true
  },
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;