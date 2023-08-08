const express = require("express")
const route = express.Router()
const CustomerSignupcontroller = require("../Controller/CustomerSignup_controller")


route.post("/", CustomerSignupcontroller.create);

module.exports = route