// const express = require("express")
// const route = express.Router()
// const imagemulter = require("../config/image_multer")
// const videocontroller = require("../Controller/Video_Controller")

// route.post("/", imagemulter.single("videoFile"), videocontroller.createVideo)
// route.get("/get", videocontroller.getAllVideos)
// route.delete('/delete/:id',videocontroller.delete)

// module.exports = route


const express = require('express');
const router = express.Router();
const videoController = require('../Controller/Video_Controller');

// Create a new video
router.post('/videos', videoController.createVideo);

// Get all videos
router.get('/get', videoController.getVideos);
router.delete('/delete/:id',videoController.delete)

module.exports = router;