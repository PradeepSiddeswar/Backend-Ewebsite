const mongoose = require('mongoose');

const Customer1SignupSchema = new mongoose.Schema({
    ShopName : {
        type : String,
        required: true
    },
    OwnerName: {
        type: String,
        required: true
    },
    Phone: {
        type : Number,
        required: true
    },
    Email: {
        type: String,
    },
    GstRegistrationNo: {
        type: Number,
    } ,
    BbmpCertificateNo:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point'},
        coordinates:[Number]
    }
});

const Customer1SignupDB = mongoose.model('Customer1Signup', Customer1SignupSchema);
module.exports = Customer1SignupDB