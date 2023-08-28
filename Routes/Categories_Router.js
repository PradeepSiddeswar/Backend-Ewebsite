const express = require("express")
const route = express.Router()
const CategoriesController = require("../Controller/Categories_Controller")


route.post('/categories-subcategories', CategoriesController.create)
// route.get('/subcategories/:category', CategoriesController.getSubcategoriesAndHotels)
module.exports = route