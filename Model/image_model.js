const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageUrl:  {
        type: String,
        requried: true
    },
    title: {
        type: String,
        requried: true
    },
   

});

const ImageDB = mongoose.model('Image', ImageSchema);
module.exports = ImageDB