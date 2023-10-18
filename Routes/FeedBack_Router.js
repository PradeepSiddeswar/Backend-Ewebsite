const express = require('express');
const router = express.Router();
const feedbackController = require('../Controller/FeedBack_Controller');

// Define routes
router.post('/', feedbackController.create);

module.exports = router;