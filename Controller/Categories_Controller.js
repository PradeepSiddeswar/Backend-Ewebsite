
const Categories = require('../Model/Categories_model');
const Hotel = require('../Model/Hotel_model');


exports.create = async (req, res) => {
  try {
    const { categoryName, subcategoryName, hotels} = req.body;

    const category = Categories({ name: categoryName })
    await category.save();

    const subcategoryHotels = hotels.map(hotel => ({
      ...hotel,
      category: category._id,
      subcategory: subcategoryName
  
    }));
   const Hotels = await Hotel.insertMany(subcategoryHotels)

    res.status(201).json({
            category: category,
          subcategory: subcategoryName,
        hotels: Hotels
      });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({error: 'Error category, subcategory'})
  }
};