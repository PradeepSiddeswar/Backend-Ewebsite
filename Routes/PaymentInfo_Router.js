
const express = require('express');
const router = express.Router();
const PaymentInfo_Controller = require('../Controller/PaymentInfo_Controller');

router.post('/', PaymentInfo_Controller.create);
// router.get('/get', DeliveryPartner_Controller.get);

module.exports = router;