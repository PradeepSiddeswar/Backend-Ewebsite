const express = require("express")
const route = express.Router()
const imagemulter = require("../config/image_multer")
const customer1signupcontroller = require("../Controller/Customer1Signup_controller")

route.post("/", imagemulter.single("image"), customer1signupcontroller.create)


module.exports = route
