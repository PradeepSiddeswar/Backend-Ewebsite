const mongoose = require('mongoose');

const NavbarSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    email: {
        type: String,
     required: true
    },
    
});

const NavbarSchemaDB = mongoose.model('Navbar', NavbarSchema);
module.exports = NavbarSchemaDB