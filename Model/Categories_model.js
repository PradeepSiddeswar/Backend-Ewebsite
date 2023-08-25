const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategoriesSchema = new Schema({
           name: {
            type: String,
            required: true
           }
})

const categoriesDB = mongoose.model("categories", CategoriesSchema)
module.exports = categoriesDB