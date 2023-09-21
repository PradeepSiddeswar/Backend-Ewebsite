
const express = require('express');
const router = express.Router();
const itemController = require('../Controller/Items_Controller');
 
// Create a new items
router.post('/', itemController.create);

// Get total items
router.get('/item-get', itemController.get);
router.get('/item-returned', itemController.getItemReturned)
router.put("/update/:id", itemController.update)
router.delete("/delete/:id", itemController.delete)
module.exports = router;