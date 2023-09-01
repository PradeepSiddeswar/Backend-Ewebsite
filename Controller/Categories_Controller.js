
const Category = require('../Model/Categories_model');
const Hotel = require('../Model/Hotel_model');


exports.createCategoryWithSubcategoryAndHotels = async (req, res) => {
  try {
    const { categoryName, subcategoryName, hotels } = req.body;

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name: categoryName });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category with the same name already exists' });
    }

    // If no duplicate category, create a new category
    const category = new Category({ name: categoryName });
    await category.save();

    // Create subcategory and associated hotels
    const subcategoryHotels = hotels.map(hotelData => {
      return new Hotel({
        category: category._id,
        subcategory: subcategoryName,
        ...hotelData
      });
    });
    const createdHotels = await Hotel.insertMany(subcategoryHotels);

    res.status(201).json({
      category: category,
      subcategory: subcategoryName,
      hotels: createdHotels
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Error creating category' });
  }
};

exports.getAllCategoriesWithSubcategoriesAndHotels = async (req, res) => {
  try {
    // Retrieve all categories
    const categories = await Category.find().populate({
      path: 'subcategories',
      populate: {
        path: 'hotels',
        model: 'Hotel'
      }
    });

    const formattedCategories = categories.map(category => ({
      category: {
        _id: category._id,
        name: category.name,
        __v: category.__v
      },
      subcategories: category.subcategories.map(subcategory => ({
        _id: subcategory._id,
        name: subcategory.name,
        __v: subcategory.__v,
        hotels: subcategory.hotels.map(hotel => ({
          _id: hotel._id,
          category: hotel.category,
          subcategory: hotel.subcategory,
          hotelName: hotel.hotelName,
          distance: hotel.distance,
          image: hotel.image,
          isVeg: hotel.isVeg,
          isNonVeg: hotel.isNonVeg,
          __v: hotel.__v
        }))
      }))
    }));

    res.status(200).json(formattedCategories);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};


  
// Delete users



exports.update = async (req, res) => {
  if (!req.body) {
      res.status(400).send("User Adrres not Found");
      return;
  }
  const id = req.params.id
  try {
      const updateData = await Hotel.findByIdAndUpdate(id, req.body, { new: true});
      
      
      if(!updateData) {
          res.status(400).send(`Connot firnd user Adderss with id ${id}`);
      } else {
          res.send(updateData);
      }
  } catch (error) {
      res.status(500).send(error);
  }
};

// Delete user
exports.delete = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the category and its associated hotels
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).send(`Category not Found with ID: ${categoryId}`);
    }

    // Delete the associated hotels
    await Hotel.deleteMany({ category: categoryId });

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    res.send("Category and associated hotels deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
