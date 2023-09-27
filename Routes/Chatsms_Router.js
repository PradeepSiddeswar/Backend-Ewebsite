const express = require('express');
const router = express.Router();
const chatsmsController = require('../Controller/Chatsms_Controller');

// Create a new chat message
router.post('/message', chatsmsController.createMessage);

// Get all chat messages
router.get('/messages', chatsmsController.getMessages);

module.exports = router;
