const express = require("express");
const router = express.Router();
const imagemulter = require("../config/image_multer")
const specialistsController = require("../Controller/Specialist_Controller");

// GET all specialists
router.get("/get", specialistsController.getAllSpecialists);

// POST a new specialist
// router.post("/",imagemulter.single("image"),specialistsController.create);
// Delete a new specialist 
router.delete('/delete/:id', specialistsController.delete)

module.exports = router;