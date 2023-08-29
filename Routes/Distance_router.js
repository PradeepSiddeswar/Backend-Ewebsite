const express = require('express');
const router = express.Router();
const distanceController = require('../Controller/Distance_Controller');

router.post('/', distanceController.createDistance);
router.get('/', distanceController.getDistance);

module.exports = router;
