const express = require("express")
const route = express.Router()
const imagemulter = require("../config/image_multer")
const videocontroller = require("../Controller/Video_Controller")

route.post("/", imagemulter.single("videoFile"), videocontroller.uploadVideo)
route.get("/get", videocontroller.getAllVideos)

module.exports = route