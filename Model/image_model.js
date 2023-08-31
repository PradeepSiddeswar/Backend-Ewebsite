const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    image:  {
        type: String,
        requried: true
    }
   

});

const ImageDB = mongoose.model('Image', ImageSchema);
module.exports = ImageDB