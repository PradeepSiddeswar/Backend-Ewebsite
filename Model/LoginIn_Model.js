const mongoose = require('mongoose');

const LoginInSchema = new mongoose.Schema({
    Email : {
        type : String,
        required: true
    },
    Password: {
        type: Number,
     required: true
    }
});

const LoginInDB = mongoose.model('LoginIn', LoginInSchema);
module.exports = LoginInDB