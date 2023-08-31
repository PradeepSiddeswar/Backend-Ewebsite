const FormLocation = require('../Model/FormLocation_model');
const Category = require('../Model/Categories_model');

exports.createFormLocation = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      image,
      EnterName,
      EnterPrice,
      categoryName,
      subcategoryName,
      hotels
    } = req.body;

    // Find or create category
    const category = await Category.findOneAndUpdate(
      { name: categoryName },
      { name: categoryName },
      { upsert: true, new: true }
    );

    // Create FormLocation
    const newFormLocation = new FormLocation({
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      image: req.file && req.file.filename ? req.protocol + "://" + req.get("host") + "/images/" + req.file.filename : "",
      EnterName,
      EnterPrice,
      category: category._id,
      subcategory: subcategoryName,
      hotels
    });

    const savedFormLocation = await newFormLocation.save();

    res.status(201).json(savedFormLocation);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Error creating FormLocation' });
  }
};



