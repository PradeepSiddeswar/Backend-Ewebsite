const mongoose = require('mongoose');

const ImageUploadSchema = new mongoose.Schema({
   
    image: {
        type: String,
        required: true
    },

});

const ImageUploadDB = mongoose.model('ImageUpload', ImageUploadSchema);
module.exports = ImageUploadDB