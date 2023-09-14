const express = require("express")
const route = express.Router()
const imagemulter = require("../config/image_multer")
const imagecontroller = require("../Controller/image_controller")

route.post("/images", imagemulter.single("image"), imagecontroller.createImages)
route.get("/get", imagecontroller.getImages)
route.delete('/delete/:id',imagecontroller.delete)

module.exports = route