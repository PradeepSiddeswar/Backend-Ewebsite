const express = require("express")
const route = express.Router()
const CategoriesController = require("../Controller/Categories_Controller")


route.post('/categories', CategoriesController.createCategoryWithSubcategoryAndHotels)
// route.get('/subcategories/:category', CategoriesController.getSubcategoriesAndHotels)
route.get("/get", CategoriesController.getAllCategoriesWithSubcategoriesAndHotels)
route.put("/update/:id", CategoriesController.update)
route.delete("/delete/:id", CategoriesController.delete)
// route.delete('/categories/:categoryId', CategoriesController.delete); // New route

module.exports = route