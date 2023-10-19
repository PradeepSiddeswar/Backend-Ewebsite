
const express = require('express');
const router = express.Router();
const DeliveryPartner_Controller = require('../Controller/DeliveryPartner_Controller');

router.post('/', DeliveryPartner_Controller.create);
router.get('/get', DeliveryPartner_Controller.get);
router.get("/delivery-form/:profileId", DeliveryPartner_Controller.getProfile)

module.exports = router;



