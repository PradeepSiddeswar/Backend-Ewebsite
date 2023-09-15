const mongoose = require('mongoose');

const UserLocationSchema = new mongoose.Schema({
    latitude : {
        type : Number,
        required: true
    },
    longitude: {
        type: Number,
     required: true
    },
    Name: {
        type : String,
        required: true
    },
    addressLine1: {
        type: String,
    },
    addressLine2: {
        type: String,
    } ,
    state:{
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    },
});

const UserLocationDB = mongoose.model('UserLocation', UserLocationSchema);
module.exports = UserLocationDB