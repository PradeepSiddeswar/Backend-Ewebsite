const express = require("express")
const route = express.Router()
const imagemulter = require("../config/image_multer")
const ordersdetailscontroller = require("../Controller/OrdersDetails_Controller")


route.post("/", imagemulter.single("image"), ordersdetailscontroller.create)
route.get("/getAll",ordersdetailscontroller.get)
// route.delete("/delete/:id", customer1signupcontroller.delete)

module.exports = route