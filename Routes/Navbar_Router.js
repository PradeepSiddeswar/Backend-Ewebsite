const express = require("express")
const route = express.Router()
const navbarcontroller = require("../Controller/Navbar_Controller")


route.post("/",  navbarcontroller.create)
route.get("/getAll",navbarcontroller.get)
route.delete("/delete/:id", navbarcontroller.delete)

module.exports = route