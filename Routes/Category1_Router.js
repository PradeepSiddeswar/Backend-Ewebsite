const express = require('express');
const router = express.Router();
const categort1controller = require('../Controller/Category1_Controller')
// const imagemulter = require("../config/image_multer")
const uploadMultiple = require('../config/image_multer')

router.post('/form', uploadMultiple, categort1controller.create)
router.get('/get', categort1controller.getAllCategories)
router.delete('/delete/:id',categort1controller.delete)
// router.get('/items/:id',categort1controller.find)
router.get('/items/:id',categort1controller.getItemById)

module.exports = router