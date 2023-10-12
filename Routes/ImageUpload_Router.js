const express = require("express")
const route = express.Router()
const ImageUpload_Multer = require("../config/ImageUpload_Multer")
const imageuploadcontroller = require("../Controller/ImageUpload_Controller")


route.post("/", ImageUpload_Multer.single("image"), imageuploadcontroller.create)

module.exports = route