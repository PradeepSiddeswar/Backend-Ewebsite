const categoriesDB = require("../Model/Categories_model")
const Hotel = require("../Model/Hotel_model")
  


exports.getCategoriesSubcategoriesHotels = async (req, res) => {
  try {
    const categories = await categoriesDB.find();
    console.log('Categories', categories)
    const categoriesWithSubcategories = [];

    for (const category of categories) {
      const subcategories = await Hotel.distinct('subcategory', { category: category._id });
      const subcategoriesWithDetails = [];

      for (const subcategory of subcategories) {
        const hotels = await Hotel.find({ category: category._id, subcategory }).select('hotelName distance image');
        subcategoriesWithDetails.push({
          subcategory,
          hotels
        });
      }

      categoriesWithSubcategories.push({
        category: category.name,
        subcategories: subcategoriesWithDetails
      });
    }

    res.json(categoriesWithSubcategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories, subcategories, and hotel details' });
  }
};
