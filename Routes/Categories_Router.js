const express = require("express")
const route = express.Router()
const CategoriesController = require("../Controller/Categories_Controller")


route.get('/', CategoriesController.getCategoriesSubcategoriesHotels)

module.exports = route