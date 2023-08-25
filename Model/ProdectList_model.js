const mongoose = require("mongoose")

const ProdectListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        default: 1
    }

})


const ProdectListDB = mongoose.model('ProdectList', ProdectListSchema)
module.exports = ProdectListDB