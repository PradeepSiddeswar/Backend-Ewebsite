const express = require("express")
const route = express.Router()
const signupController = require("../Controller/SignUp_Controller")


route.post("/Sign", signupController.create)
// route.get("/getAll",logininController.get)
module.exports = route