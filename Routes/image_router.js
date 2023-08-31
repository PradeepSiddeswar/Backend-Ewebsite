const express = require("express")
const route = express.Router()
const imagemulter = require("../config/image_multer")
const imagecontroller = require("../Controller/image_controller")

route.post("/", imagemulter.single("image"), imagecontroller.create)
route.get("/get", imagecontroller.find)
route.get("/category", imagecontroller.getAllCategory)

module.exports = route