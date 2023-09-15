const mongoose = require('mongoose');

const UserLocationSchema = new mongoose.Schema({
   
    address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    } ,
    StreetAddress:{
        type: String,
        required: true
    },
    PostalCode: {
        type: Number,
        // PostalCode is optional, so we don't set it as required
    },
});

const UserLocationDB = mongoose.model('UserLocation', UserLocationSchema);
module.exports = UserLocationDB