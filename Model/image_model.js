const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

});

const ImageDB = mongoose.model('Image', ImageSchema);
module.exports = ImageDB