
const express = require('express');
const router = express.Router();
const CartTotal_Controller = require('../Controller/CartTotal_Controller');

router.post('/', CartTotal_Controller.create);
// router.get('/get', DeliveryPartner_Controller.get);

module.exports = router;