const express = require('express');
const route = express.Router();
const categort1controller = require('../Controller/Category1_Controller')

route.post('/form', categort1controller.create)
route.get('/get', categort1controller.getallCategories)

module.exports = route