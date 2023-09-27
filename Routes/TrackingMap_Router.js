const express = require('express');
const router = express.Router();
const trackingMapController = require('../Controller/TrackingMap_Controller');

// POST endpoint to create a new tracking map
router.post('/tracking-map', trackingMapController.createTrackingMap);

module.exports = router;