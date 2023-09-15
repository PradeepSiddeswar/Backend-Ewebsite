const express = require("express")
const route = express.Router()
const userlocationController = require("../Controller/UserLocation_Controller")


route.post("/location", userlocationController.create)
route.get("/getAll",userlocationController.get)
module.exports = route