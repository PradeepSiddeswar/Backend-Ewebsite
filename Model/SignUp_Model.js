const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
    FirstName : {
        type : String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type:String,
        required: true
    },
    Phone : {
        type: Number,
        required: true
    }
});

const SignUpDB = mongoose.model('SignUp', SignUpSchema);
module.exports = SignUpDB