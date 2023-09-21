const mongoose = require('mongoose')

const TextsmsSchema = new mongoose.Schema(
    {
        fron: String,
        to: String,
        text: String,
        messageId: String,
        timestamp: { type: Date, default: Date.now },
    });
     const Textsms = mongoose.model('Textsms', TextsmsSchema);

     module.exports = Textsms
