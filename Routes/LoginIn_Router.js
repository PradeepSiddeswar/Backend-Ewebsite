const express = require("express")
const route = express.Router()
const logininController = require("../Controller/LoginIn_Controller")


route.post("/LoginIn", logininController.create)
route.get("/getAll",logininController.get)
module.exports = route