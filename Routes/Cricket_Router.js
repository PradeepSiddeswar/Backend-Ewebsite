// cricketRouter.js

const express = require('express');
const router = express.Router();
const cricketController = require('../Controller/Cricket_Controller');

// Define a route to get live cricket scores
router.get('/live-scores', cricketController.getLiveCricketScores);

module.exports = router;


