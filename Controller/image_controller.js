const ImageDB = require('../Model/image_model');

exports.createImages = async (req, res) => {
    try {
      const { imageUrl, title } = req.body;
      
      // Assuming you are using Multer for file uploads
      const imagePath = req.file ? req.protocol + "://" + req.get("host") + "/images/" + req.file.filename : "";
  
      const image = new ImageDB({ imageUrl, title, imagePath });
      await image.save(); // Save the 'image' object
      res.json({ message: 'Image created successfully', data: image });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };


exports.getImages = async (req, res) => {
    try {
      const images = await ImageDB.find();
      res.json({ message: 'Success', data: { WebsiteImages: images } });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  
  
  exports.delete = (req, res) => {
    const id = req.params.id
    ImageDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`category not found with ${id}`)
            } else {
                res.send("category deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
  }