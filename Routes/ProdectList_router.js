const express = require("express")
const route = express.Router();
const ProdectListController = require("../Controller/ProdectList_controller")

route.post('/multiple', ProdectListController.create)
module.exports = route