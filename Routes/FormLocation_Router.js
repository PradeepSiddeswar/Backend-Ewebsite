const express = require("express")
const route = express.Router()
const FormLocation_Controller =require("../Controller/FormLocation_Controller")
const imagemulter = require('../config/image_multer')


route.post("/", imagemulter.single("image"), FormLocation_Controller.createFormLocation)
module.exports = route