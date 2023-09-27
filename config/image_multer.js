const multer = require("multer")
const path = require("path")
const express = require("express");

const fileStorageEngine = multer.diskStorage({
    
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
});


const upload = multer({
    storage: fileStorageEngine
});
// const uploadMultiple = upload.fields([
//     { name: 'profileImage1', maxCount: 1 },
//     { name: 'profileImage2', maxCount: 1 },
//   ]);

// module.exports = uploadMultiple
 module.exports = upload