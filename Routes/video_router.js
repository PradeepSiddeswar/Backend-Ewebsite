const express = require('express');
const router = express.Router();
const videoController = require('../Controller/Video_Controller');

// Create a new video
router.post('/videos', videoController.createVideo);

// Get all videos
router.get('/get', videoController.getVideos);
// Get all Delete
router.delete('/delete/:id',videoController.delete)

module.exports = router;